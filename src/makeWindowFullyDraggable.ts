import {BrowserWindow} from "electron";

const VM_MOUSEMOVE = 0x0200;  // https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-lbuttonup
const WM_LBUTTONUP = 0x0202;   // https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-mousemove

const makeWindowFullyDraggable = (browserWindow: BrowserWindow): void => {
    const initialPos = {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
    };

    let dragging = false;

    browserWindow.hookWindowMessage(WM_LBUTTONUP, () => {
        dragging = false;

        // const currentBounds = browserWindow.getBounds();
        //
        // browserWindow.setBounds({
        //     x: ,
        //     y: y + browserWindow.getPosition()[1] - initialPos.y,
        //     height: initialPos.height,
        //     width: initialPos.width,
        // });
    });
    browserWindow.hookWindowMessage(
        VM_MOUSEMOVE,
        (_wParam: Buffer, lParam: Buffer) => {
            if (!browserWindow) {
                return;
            }

            const x = lParam.readInt16LE(0);
            const y = lParam.readInt16LE(2);
            if (!dragging) {
                dragging = true;
                initialPos.x = x;
                initialPos.y = y;
                initialPos.height = browserWindow.getBounds().height;
                initialPos.width = browserWindow.getBounds().width;
                return;
            }
            browserWindow.setBounds({
                x: x + browserWindow.getPosition()[0] - initialPos.x,
                y: y + browserWindow.getPosition()[1] - initialPos.y,
                height: initialPos.height,
                width: initialPos.width,
            });
        }
    );
};

export default makeWindowFullyDraggable;