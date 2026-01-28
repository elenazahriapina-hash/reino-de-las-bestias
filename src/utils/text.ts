export function sanitizeFullText(rawText: string) {
    const lines = rawText
        .split(/\r?\n/)
        .map((line) => {
            if (line.trim() === "---") {
                return "";
            }
            return line.replace(/^\s*#{1,6}\s*/, "");
        });

    const cleaned: string[] = [];
    let blankCount = 0;

    for (const line of lines) {
        if (line.trim() === "") {
            blankCount += 1;
            if (blankCount <= 2) {
                cleaned.push("");
            }
        } else {
            blankCount = 0;
            cleaned.push(line);
        }
    }

    return cleaned.join("\n").trim();
}
