import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import duration from 'dayjs/plugin/duration.js';
import EventEmitter from 'events';
import process from 'process';

dayjs.extend(duration);
/*
На вход принимает продолжительность таймера в формате ss-mm-hh-dd-mm-yy
Например, 45-01-02-03-04-05 для 5 лет 4 месяцев 3 дней 2 часов 1 минуты 45 секунд
*/
const setTimers = process.argv.slice(2);
const emitter = new EventEmitter();

class Timer {
    constructor(timerValue) {
        this.endTime = this.getTimerEndTime(timerValue);
        this.timerValue = timerValue;
        
        this.interval = setInterval(() => {
            this.timerTick();
        }, 1000);
    }

    getTimerEndTime(timerValue) {
        const timerToArrayOfValues = timerValue.split('-');
        if (timerToArrayOfValues.length < 6) {
            throw new Error('Неверный формат продолжительности таймера');
        }
        const now = dayjs();
        const timerDuration = dayjs.duration({
            seconds: timerToArrayOfValues[0],
            minutes: timerToArrayOfValues[1],
            hours: timerToArrayOfValues[2],
            days: timerToArrayOfValues[3],
            months: timerToArrayOfValues[4],
            years: timerToArrayOfValues[5],          
        });
        return now.add(timerDuration);
    }

    timerTick() {
        const duration = dayjs.duration(this.endTime.diff(dayjs()));
        if (duration.asSeconds() <= 0) {
            emitter.emit('timerFinish', `Таймер ${this.timerValue} завершился`);
            clearInterval(this.interval);
        } else {
            emitter.emit('timerTick', `До таймера ${this.timerValue} осталось ${duration.format('YY лет MM месяцев DD дней HH:mm:ss')}`);
        }
    }
}

setTimers.forEach(inputTimer => {
    new Timer(inputTimer);
});

emitter.on('timerFinish', (payload) => {
    console.log(payload);
});

emitter.on('timerTick', (payload) => {
    console.log(payload);
});