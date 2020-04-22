import { Handler, Context } from "./common";

import Spreadsheet from "x-data-spreadsheet";
import Papa from "papaparse";
import DataSource from "../data-source";

export default class EditHandler implements Handler {
	async handle(ctx: Context): Promise<void> {
		const spreadsheetDiv = document.createElement("div");
		spreadsheetDiv.style.width = "100%";
		spreadsheetDiv.style.height = "100%";
		ctx.element.append(spreadsheetDiv);

		const arraysToSheet = (data: any[][]): Record<string, unknown> =>
			Object.fromEntries(
				data.map((row, i) => {
					const cells = Object.fromEntries(
						row.map((cell, j) => [j, { text: cell }])
					);
					return [i, { cells }];
				})
			);

		const sheetToArrays = (rows: Record<string, unknown>): string[][] => {
			const length = (object: Record<string, unknown>): number => {
				const numbers = Object.keys(object)
					.map(i => parseInt(i, 10))
					.filter(n => n >= 0);
				return numbers.length === 0 ? 0 : Math.max(...numbers) + 1;
			};

			const cellsPerRow = Array.from(new Array(length(rows))).map(
				(_, i) => Object.assign({ cells: [] }, rows[i]).cells
			);

			const baseRow =
				cellsPerRow.length === 0
					? []
					: Array.from(new Array(Math.max(...cellsPerRow.map(length))));

			return cellsPerRow.map(cells =>
				baseRow.map((_, j) => (cells[j] || {}).text)
			);
		};

		const options = {
			showToolbar: false,
			view: {
				height: () => spreadsheetDiv.clientHeight,
				width: () => spreadsheetDiv.clientWidth,
			},
		};

		type Table = {
			sheet: { name: string; rows: Record<string, unknown> };
			data: DataSource<string>;
		};

		const tables = new Map(
			await Promise.all(
				ctx.view.resources.map(async resource => {
					const name = resource.value.name;
					const data: string = await resource.value.latest;

					const arrays = Papa.parse(data).data;

					const sheet = { name, rows: arraysToSheet(arrays) };
					const pair: [string, Table] = [name, { sheet, data: resource.value }];
					return pair;
				})
			)
		);

		const spreadsheet = new Spreadsheet(spreadsheetDiv, options)
			.loadData(Array.from(tables.values()).map(({ sheet }) => sheet))
			.change(() => {
				spreadsheet.getData().forEach((sheet: any) => {
					if (tables.has(sheet.name)) {
						const csv = Papa.unparse(sheetToArrays(sheet.rows));
						tables.get(sheet.name).data.latest = csv;
					}
				});
			});
	}
}