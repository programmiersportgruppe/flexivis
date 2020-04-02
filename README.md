# Flexivis

Flexivis is a flexible visualisation tool that allows you to easily visualise diverse types of data in Web browser.

<ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#layout">Layout</a></li>
    <li>
        <a href="#view-specifications">View specifications</a>
        <ul>
            <li><a href="regular-content">Regular Content</a></li>
            <li><a href="markdown">Markdown</a></li>
            <li><a href="json">JSON</a></li>
            <li><a href="text">Text</a></li>
            <li><a href="map">Map</a></li>
            <li><a href="mermaid-diagrams">Mermaid Diagrams</a></li>
            <li><a href="vega-graphs">Vega Graphs</a></li>
        </ul>
    </li>
    <li class="hide-in-app"><a href="#development">Development</a></li>
</ul>


## Overview

Flexivis combines two main abilities:
- Render or visualise many types of data.
- Lay out multiple views into sub-regions of the browser window.

Using Flexivis is simple:
1. You build a Flexivis URL that describes the various views you'd like to display and optionally the layout that should be used to combine them.
2. Nagivating to that URL displays the rendered layout.


Here's an [example Flexivis URL]:
```
https://flexivis.infrastruktur.link?layout=(explanation30-map)/source&explanation=md:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.md&map=map:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json&source=json:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json
```

[example Flexivis URL]: https://flexivis.infrastruktur.link?layout=(explanation30-map)/source&explanation=md:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.md&map=map:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json&source=json:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json

It renders something like this:

<a href="https://flexivis.infrastruktur.link?layout=(explanation30-map)/source&explanation=md:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.md&map=map:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json&source=json:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json"><img alt="Screenshot of the &amp;Berlin Walk&amp; example in Fleixvis showing a layout with 3 views: a Markdown document in the top-left, a map in bottom-left, and JSON document on the right." src="docs/images/berlin-walk.png" style="border: 1px solid #ccc; max-height: 300px"/></a>

At first glance, the URL above is quite a mouthful, but it's actually not very complicated. Let's break it down. Without the query string, the URL is simply https://flexivis.infrastruktur.link/, which is Flexivis's base URL. There are then 4 query string parameters:
- layout=(explanation30-map)/source
- explanation=md:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.md
- map=map:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json
- source=json:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json

The [`layout`](#layout) parameter specifies how to lay out the named views in the available screen real estate. The other 3 parameters each provide a named [view specification](#view-specifications).


## Layout

The optional `layout` parameter specifies how to lay out the individual views in the available screen real estate.

<table>
    <tr>
        <td style="min-width: 90px"><img src="https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/images/layout-foo.svg?sanitize=true"/></td>
        <td>A single view is specified by its name (containing only alphanumeric characters), e.g. <code>layout=foo</code>.</td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/images/layout-url.svg?sanitize=true"/></td>
        <td>When there is no <code>layout</code> parameter, <code>layout=url</code> is implied.</td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/images/layout-horizontal.svg?sanitize=true"/></td>
        <td>Views can be layed out side-by-side with the <code>/</code> operator: <code>layout=foo/bar</code>.</td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/images/layout-vertical.svg?sanitize=true"/></td>
        <td>Views can be layed out in a vertical stack with the <code>-</code> operator: <code>layout=foo-bar-baz</code>.</td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/images/layout-grouping.svg?sanitize=true"/></td>
        <td>Parentheses can be used for grouping: <code>layout=foo/(bar-baz)</code>.</td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/images/layout-percentage.svg?sanitize=true"/></td>
        <td>A number immediately after a view specifies the percentage of the parent view that it will occupy,<br/> with the remaining percentage distributed amongst views without an explicit percentage:<br/> <code>layout=foo/(bar40-baz)75</code>.</td>
    </tr>
</table>


## View Specifications

All query parameters other than the [`layout`](#layout) parameter specifiy individual views.
The parameter name is the name of the view (which can then be used in the `layout` parameter), and the value is a view specification.

The basic format of a view specification is `<prefix>:<url-and-view-specific-params>`.

The prefix specifies the view type. The following view types are supported:

<ul>
    <li><a href="regular-content">Regular Content</a></li>
    <li><a href="markdown">Markdown</a></li>
    <li><a href="json">JSON</a></li>
    <li><a href="text">Text</a></li>
    <li><a href="map">Map</a></li>
    <li><a href="mermaid-diagrams">Mermaid Diagrams</a></li>
    <li><a href="vega-graphs">Vega Graphs</a></li>
</ul>


### Regular Content

View specification prefixs: `http`, `https`, `file`.

HTTP/S URLs can be loaded and displayed in IFrames.

```
https://flexivis.infrastruktur.link/?layout=a/b&a=https://wikipedia.org&b=https://example.com
```

<a href="https://flexivis.infrastruktur.link/?layout=a/b&amp;a=https://wikipedia.org&amp;b=https://example.com"><img alt="rendering of the URL shown above" src="docs/images/example-frame-1.png" style="border: 1px solid #ccc; max-height: 300px"/></a>

If your browser environment permits it (e.g. if you build Flexivis locally and open it from a `file:` URL), you can also load content from `file:` URLs. This can be useful to visualise build outputs, for example.

```
https://flexivis.infrastruktur.link/?layout=a/b&a=file://results.html&b=file://generated-image.png
```


### Markdown

View specification prefixs: `md`, `md-inline`.

Render [Markdown](https://en.wikipedia.org/wiki/Markdown) content.

```
https://flexivis.infrastruktur.link/?layout=a/b&a=md:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/markdown.md&b=md-inline:This pane contains **inline** Markdown content taken _from the URL_.
```

<a href="https://flexivis.infrastruktur.link/?layout=a/b&amp;a=md:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/markdown.md&amp;b=md-inline:This pane contains **inline** Markdown content taken _from the URL_."><img alt="rendering of the URL shown above" src="docs/images/example-markdown-1.png" style="border: 1px solid #ccc; max-height: 300px"/></a>


### JSON

View specification prefixs: `json`, `json-inline`.

Render JSON in an interactive viewer.

```
https://flexivis.infrastruktur.link/?layout=a/b&a=json:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/package-lock.json&b=json-inline:{"name": "inline JSON example", "id": 42, "values": ["foo", "baz", "bar"]}
```

<a href="https://flexivis.infrastruktur.link/?layout=a/b&amp;a=json:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/package-lock.json&amp;b=json-inline:{&quot;name&quot;: &quot;inline JSON example&quot;, &quot;id&quot;: 42, &quot;values&quot;: [&quot;foo&quot;, &quot;baz&quot;, &quot;bar&quot;]}"><img alt="rendering of the URL shown above" src="docs/images/example-json-1.png" style="border: 1px solid #ccc; max-height: 300px"/></a>


### Text

View specification prefixs: `text`, `text-inline`.

Display plain text. This can be used to display the source of a visualisation alongside the visualisation itself.

```
https://flexivis.infrastruktur.link/?layout=(a-b)/c&a=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/plaintext.txt&b=text-inline:This is just _plain_ inline text from the URL&c=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/README.md
```

<a href="https://flexivis.infrastruktur.link/?layout=(a-b)/c&amp;a=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/plaintext.txt&amp;b=text-inline:This is just _plain_ inline text from the URL&amp;c=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/README.md"><img alt="rendering of the URL shown above" src="docs/images/example-text-1.png" style="border: 1px solid #ccc; max-height: 300px"/></a>


### Map

View specification prefix: `map`.

Renders GeoJSON on an interactive map.

```
https://flexivis.infrastruktur.link/?layout=a/b&a=map:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json&b=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json
```

<a href="https://flexivis.infrastruktur.link/?layout=a/b&amp;a=map:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json&amp;b=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/berlin-walk.json"><img alt="rendering of the URL shown above" src="docs/images/example-map-1.png" style="border: 1px solid #ccc; max-height: 300px"/></a>


### Mermaid Diagrams

View specification prefixs: `mermaid`, `mermaid-inline`.

Renders [mermaid](https://mermaid-js.github.io/mermaid/) diagrams.

```
https://flexivis.infrastruktur.link/?layout=(a-b)/c&a=mermaid:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/mermaid.mmd&b=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/mermaid.mmd&c=mermaid-inline:graph TB; p[mermaid-inline prefix] --> URL; s[Mermaid source] --> URL -->|Flexivis| r[Rendered Diagram]
```

<a href="https://flexivis.infrastruktur.link/?layout=(a-b)/c&amp;a=mermaid:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/mermaid.mmd&amp;b=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/mermaid.mmd&amp;c=mermaid-inline:graph TB; p[mermaid-inline prefix] --> URL; s[Mermaid source] --> URL -->|Flexivis| r[Rendered Diagram]"><img alt="rendering of the URL shown above" src="docs/images/example-mermaid-1.png" style="border: 1px solid #ccc; max-height: 300px"/></a>


### Vega Graphs

View specification prefixs: `vega`, `vega-inline`.

Renders [Vega](https://vega.github.io/vega/) and [Vega-Lite](https://vega.github.io/vega-lite/) graphs.

```
https://flexivis.infrastruktur.link/?layout=(a-c30)/b&a=vega:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/cloc.json&b=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/cloc.json&c=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/cloc.csv
```

<a href="https://flexivis.infrastruktur.link/?layout=(a-c30)/b&amp;a=vega:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/cloc.json&amp;b=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/cloc.json&amp;c=text:https://raw.githubusercontent.com/programmiersportgruppe/flexivis/master/docs/samples/cloc.csv"><img alt="rendering of the URL shown above" src="docs/images/example-vega-1.png" style="border: 1px solid #ccc; max-height: 300px"/></a>

You can specify the graph by putting JSON in the URL. The JSON can then load values by URL (like the JSON shown in the previous example), or you can embed the values in the JSON.

```
https://flexivis.infrastruktur.link/?url=vega-inline:{"data": {"values": [{"factor": "awesomeness", "score": 10}, {"factor": "weirdness", "score": 3}, {"factor": "color", "score": 7}]}, "mark": "bar", "encoding": {"x": {"field": "factor", "type": "nominal"}, "y": {"field": "score", "type": "quantitative"}, "color": {"field": "factor", "type": "nominal"}}, "height": "container", "width": 100}
```

<a href="https://flexivis.infrastruktur.link/?url=vega-inline:{&quot;data&quot;: {&quot;values&quot;: [{&quot;factor&quot;: &quot;awesomeness&quot;, &quot;score&quot;: 10}, {&quot;factor&quot;: &quot;weirdness&quot;, &quot;score&quot;: 3}, {&quot;factor&quot;: &quot;color&quot;, &quot;score&quot;: 7}]}, &quot;mark&quot;: &quot;bar&quot;, &quot;encoding&quot;: {&quot;x&quot;: {&quot;field&quot;: &quot;factor&quot;, &quot;type&quot;: &quot;nominal&quot;}, &quot;y&quot;: {&quot;field&quot;: &quot;score&quot;, &quot;type&quot;: &quot;quantitative&quot;}, &quot;color&quot;: {&quot;field&quot;: &quot;factor&quot;, &quot;type&quot;: &quot;nominal&quot;}}, &quot;height&quot;: &quot;container&quot;, &quot;width&quot;: 100}"><img alt="rendering of the URL shown above" src="docs/images/example-vega-2.png" style="border: 1px solid #ccc; max-height: 300px"/></a>


<div class="hide-following-in-app"></div>

## Development

### Setup

```bash
npm install
gem install s3_website
```

### Deploy

```bash
npm run build
s3_website push
```
