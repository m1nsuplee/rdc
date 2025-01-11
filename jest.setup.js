class PointerEvent extends Event {
  constructor(type, props) {
    super(type, props);
    this.clientX = props?.clientX ?? 0;
    this.clientY = props?.clientY ?? 0;
  }
}
global.PointerEvent = PointerEvent;

const mockContext = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  closePath: jest.fn(),
  clearRect: jest.fn(),
  strokeStyle: undefined,
  lineWidth: undefined,
};

HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

global.__MOCK_CANVAS_CONTEXT__ = mockContext;
