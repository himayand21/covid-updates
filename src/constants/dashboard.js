export const dashboardCountKeys = ['confirmed', 'deaths', 'recovered'];

export const colors = {
    confirmed: {
        range: ["rgba(0, 123, 255, 1)", "rgba(0, 123, 255, 0.1)"],
        hover: "rgba(0, 123, 255, 0.8)",
        default: "rgba(0, 123, 255, 1)"
    },
    deaths: {
        range: ["#ff073a", "rgba(255, 7, 58, 0.1)"],
        hover: "#ff073aca",
        default: "#ff073a"
    },
    recovered: {
        range: ["#28a745", "rgba(40, 167, 69, 0.4)"],
        hover: "#28a745ca",
        default: "#28a745"
    }
}