import React, { useState } from "react";
import "./index.css";
import { ReactComponent as ThreeDots } from "../../public/svg/threedots.svg";
import { IPresentation } from "src/api/useGetPresentations";

interface IPresentationItemProps {
  presentation: IPresentation;
}

const PresentationItem = ({ presentation }: IPresentationItemProps) => {
  const [showEditOverlay, setShowEditOverlay] = useState(false);

  return (
    <div className="presentationContainer">
      <div className="presentationTitleContainer">
        <p className="presentationTitle">{presentation.name}</p>
        <ThreeDots className="threeDots" />
      </div>
      <p className="lastUpdated">
        Last update {timeAgo(presentation.last_updated)}
      </p>

      <img
        className="presentationImage"
        src={
          presentation.image ??
          "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"
        }
      />

      <p className="presentationAuthor">by {presentation.created_by}</p>
    </div>
  );
};

const timeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);

  const diffInMs = now.getTime() - time.getTime(); // Difference in milliseconds
  const localOffset = now.getTimezoneOffset() * 60000;
  const adjustedTimeInMs = diffInMs + localOffset; // Convert to local timezone

  const diffInSec = Math.floor(adjustedTimeInMs / 1000); // Convert to seconds
  const diffInMin = Math.floor(diffInSec / 60); // Convert to minutes
  const diffInHours = Math.floor(diffInMin / 60); // Convert to hours
  const diffInDays = Math.floor(diffInHours / 24); // Convert to days

  if (diffInSec < 60) {
    return `${diffInSec} second${diffInSec !== 1 ? "s" : ""} ago`;
  } else if (diffInMin < 60) {
    return `${diffInMin} minute${diffInMin !== 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  } else {
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
  }
};

export default PresentationItem;
