/**
 * Formats time in seconds to a clock time
 * @param time in seconds
 * @returns mm:ss
 */
export function formatTime(time: number): string {
    if (time < 0) {
        return "00:00";
    }
    // console.log(`Formatting time ${time}`);
    const minutes = Math.floor(time / 60);
    // console.log(`Minutes ${minutes}`);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
