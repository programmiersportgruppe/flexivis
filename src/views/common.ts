import { XViewFrame } from "../parser";

export interface Context {
	riot: any;
	element: HTMLElement;
	view: XViewFrame;
	handleError: (error: Error) => void;
}

/**
 * Handles view specifications by rendering them into an element.
 */
export interface Handler {
	/**
	 * Renders a view into the given element.
	 *
	 * @returns A promise that is fulfilled when the view is rendered, or rejected if the view cannot be rendered.
	 */
	handle(ctx: Context): Promise<void>;
}

/**
 * Handles views types that are fully defined by a source string.
 *
 * These handlers can be used in 2 ways:
 * - By default, the view description is taken to be a URL from which the source should be retrieved.
 * - When the handler's base name is suffixed with "-inline", the view description itself is taken to be the source.
 *
 * Implementations need only specify how to render the view given the source string.
 */
export abstract class SourceHandler implements Handler {
	async handle(ctx: Context): Promise<void> {
		ctx.view.resources[0].value.observe(async (error, source) => {
			if (error) {
				ctx.handleError(error);
			}

			ctx.element.innerHTML = "";
			try {
				return await this.handleWithSource(source, ctx);
			} catch (handleError) {
				ctx.handleError(handleError);
			}
		});
	}

	/**
	 * Renders the source into the given element.
	 *
	 * @param source the source text to render
	 * @returns {Promise.<*>} a promise that is fulfilled when the view is rendered, or rejected if the view cannot be rendered
	 */
	abstract handleWithSource(source: string, ctx: Context): Promise<void>;
}