import { useMemo } from "react";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import classes from "./MapView.module.css";

export default function MapView({ location, className, mapMarkerLabel }) {
  const options = useMemo(() => ({ mapId: "6a59d5a654e7c4b1" }), []); //dark

  return (
    <div className={`${classes?.container} ${className && className}`}>
      <GoogleMap
        zoom={16}
        center={location}
        // options={options}
        mapContainerClassName={classes["map-container"]}>
        {location && (
          <>
            <OverlayView
              position={location}
              mapPaneName={OverlayView?.OVERLAY_MOUSE_TARGET}>
              <>
                {mapMarkerLabel && (
                  <h6 className={classes.markerTitle}>{mapMarkerLabel}</h6>
                )}
                <Marker position={location} title={mapMarkerLabel} />
              </>
            </OverlayView>
          </>
        )}
      </GoogleMap>
    </div>
  );
}
