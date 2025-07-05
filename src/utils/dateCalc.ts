
function dateCalc(timestamp: number) {
    const futureDate = new Date(timestamp * 1000);
    const now = new Date();

    let diff = futureDate.getTime() - now.getTime();

    if (diff <= 0) {
        console.log("The date is in the past");
    } else {
        /*
        //format date of release
        const dayRelease = futureDate.getDate().toString().padStart(2, "0");
        const monthRelease = (futureDate.getMonth() + 1).toString().padStart(2, "0");
        const yearRelease = futureDate.getFullYear().toString().slice(-2);
        const dateRelease = `${dayRelease}/${monthRelease}/${yearRelease}`;
         */

        // calculate time difference between now and the count down date
        const msInMin = 1000 * 60;
        const msInHour = msInMin * 60;
        const msInDay = msInHour * 24;

        const days = Math.floor(diff / msInDay);
        diff -= days * msInDay;

        const hours = Math.floor(diff / msInHour);
        diff -= hours * msInHour;

        const minutes = Math.floor(diff / msInMin);

        return `${days}/${hours}/${minutes}`;
    }
}

export default dateCalc;