export const toiToSeconds = (toi: string | undefined): number => {
    if (!toi || !toi.includes(":")) return 0;
    const [minutes, seconds] = toi.split(":").map(Number);
    return minutes * 60 + seconds;
};