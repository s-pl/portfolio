import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Samuel Ponce Luna — Full Stack Developer";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "#0a0a0a",
          fontFamily: "monospace",
        }}
      >
        <div style={{ color: "#34d399", fontSize: 22, marginBottom: 28 }}>
          ~/samuelponce.es
        </div>
        <div
          style={{
            color: "#fafafa",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Samuel Ponce Luna
        </div>
        <div style={{ color: "#a1a1aa", fontSize: 30 }}>
          Full Stack Developer
        </div>
      </div>
    ),
    { ...size }
  );
}
