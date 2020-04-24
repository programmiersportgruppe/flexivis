import * as riot from "riot";
import { Context, SourceHandler, inlineExpandedViews } from "./common";
import { FlexivisError } from "../flexivis";

type Tabs = {
	tabs: { [key: string]: string | Record<string, unknown> };
};

const isValid = (object: any): object is Tabs => {
	return Boolean((object as Tabs).tabs);
};

export default class SelectHandler extends SourceHandler {
	async handleWithSource(source: string, ctx: Context): Promise<void> {
		const definition = JSON.parse(source);
		if (isValid(definition)) {
			riot.mount(
				ctx.element,
				{
					tabs: inlineExpandedViews(definition.tabs),
					config: ctx.view.config,
				},
				"multi-tab"
			);
		} else {
			throw new FlexivisError(
				"InvalidTabViewDefinition",
				"Invalid Tab View Definition",
				`The format ’${source}’ is invalid.`
			);
		}
	}
}
