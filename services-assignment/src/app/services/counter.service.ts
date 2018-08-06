export class CounterService {
    activeToInactiveCounter = 0;
    inactiveToActiveCounter = 0;

    incrementActiveToInactive() {
        this.activeToInactiveCounter++;
        console.log('activeToInactiveCounter', this.activeToInactiveCounter);
    }

    incrementInactiveToactive() {
        this.inactiveToActiveCounter++;
        console.log('inactiveToActiveCounter', this.inactiveToActiveCounter);
    }
}
