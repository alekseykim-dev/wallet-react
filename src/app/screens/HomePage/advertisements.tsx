
import React from "react";

export function Advertisements() {
  return (
    <div id="video" className="ads_shop_frame">
      <video
        className={"ads_video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
        width={"100%"}
        height={"auto"}
      >
        <source src="/home/ad.mp4" type="video/mp4" />
      </video>
      {/* <img src="/home/phone.svg" alt="" /> */}
    </div>
  );
}
