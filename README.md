Quick Versus Launcher for MUGEN
===============================

![Screenshot 1](./docs/screenshot-1.png)

Installation
------------

Download [quick-versus.exe](https://github.com/mugen-launcher/quick-versus/releases/latest/download/quick-versus.exe) and put it on the same directory as `mugen.exe`.

Create the file `quick-versus.json`:

```json
{
  "characterColumns": 3,
  "categories": [
    {
      "name": "Street Fighter",
      "image": "Street Fighter/image.png",
      "characters": [
        {
          "definition": "Street Fighter/Ryu/Ryu.def",
          "thumbnail": "Street Fighter/Ryu/thumbnail.png",
          "portrait": "Street Fighter/Ryu/portrait.png"
        }
      ]
    }
  ],
  "stages": [
    {
      "definition": "Training.def",
      "image": "Training.png"
    }
  ],
  "playerOne": {
    "keyboard": {
      "left": "ArrowLeft",
      "right": "ArrowRight",
      "up": "ArrowUp",
      "down": "ArrowDown",
      "a": "w",
      "b": "x",
      "c": "c",
      "x": "q",
      "y": "s",
      "z": "d",
      "escape": "Escape",
      "enter": "Enter"
    },
    "gamepad": {
      "left": "0-14",
      "right": "0-15",
      "up": "0-12",
      "down": "0-13",
      "a": "0-1",
      "b": "0-0",
      "c": "0-7",
      "x": "0-3",
      "y": "0-2",
      "z": "0-5",
      "escape": "0-8",
      "enter": "0-9"
    }
  },
  "playerTwo": {
    "keyboard": {
      "left": "k",
      "right": "m",
      "up": "o",
      "down": "l",
      "a": "g",
      "b": "h",
      "c": "j",
      "x": "t",
      "y": "y",
      "z": "u",
      "escape": "i",
      "enter": "p"
    },
    "gamepad": {
      "left": "1-14",
      "right": "1-15",
      "up": "1-12",
      "down": "1-13",
      "a": "1-1",
      "b": "1-0",
      "c": "1-7",
      "x": "1-3",
      "y": "1-2",
      "z": "1-5",
      "escape": "1-8",
      "enter": "1-9"
    }
  }
}
```

Characters are organized by category.
Each category has an image (displayed on top of the screen).
For each character, you need to provide:
- the definition path
- the thumbnail path
- the portrait path

Optional properties
-------------------

| Name | Description |
| ---- | ----------- |
| `background` | Image path of the background |
| `motif` | Motif name |
| `characterColumns` | Number of columns to display character thumbnails |

State of the application
------------------------

![States](./docs/state-machine.png)
