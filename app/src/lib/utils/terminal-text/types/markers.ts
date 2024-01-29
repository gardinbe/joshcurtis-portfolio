//Markers

/** A marker within a text string that indicates a point for an event to occur. */
export type Marker = MinHeightMarker;

interface MarkerBase {
	type: "marker";
}

interface MinHeightMarker extends MarkerBase {
	option: "minHeight";
}