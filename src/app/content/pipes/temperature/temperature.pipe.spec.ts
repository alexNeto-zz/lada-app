import { TemperaturePipe } from '@pipes/temperature/temperature.pipe';


describe('TemperaturePipe', () => {
  it('create an instance', () => {
    const pipe = new TemperaturePipe();
    expect(pipe).toBeTruthy();
  });
});
