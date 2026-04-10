import { ImageResponse } from "@vercel/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09101F",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#00C896",
            textAlign: "center",
            padding: "0 48px",
            lineHeight: 1.1,
          }}
        >
          Stop Leaving Money On The Table.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 22,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 900,
            padding: "0 48px",
          }}
        >
          Free AI salary negotiation scripts — SalaryDaddy
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
