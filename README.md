Quick Versus Launcher for MUGEN
===============================

Launch a MUGEN fight without without displaying the screenpack.

![Video 1](./docs/video-1.gif)

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
          "definition": "Street Fighter/Ryu/Ryu.def"
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
      "left": "0-17",
      "right": "0-18",
      "up": "0-19",
      "down": "0-20",
      "a": "0-0",
      "b": "0-1",
      "c": "0-7",
      "x": "0-2",
      "y": "0-3",
      "z": "0-6",
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
      "left": "1-17",
      "right": "1-18",
      "up": "1-19",
      "down": "1-20",
      "a": "1-0",
      "b": "1-1",
      "c": "1-7",
      "x": "1-2",
      "y": "1-3",
      "z": "1-6",
      "escape": "1-8",
      "enter": "1-9"
    }
  }
}
```

Characters are organized by category.
Each category has an image (displayed on top of the screen).
For each character, you need to provide the definition path.

Optional properties
-------------------

| Name | Description |
| ---- | ----------- |
| `background` | Image path of the background |
| `motif` | Motif name |
| `characterColumns` | Number of columns to display character thumbnails |
| `categories.*.random` | Indicates that the category is a random selection (default: `false`) |
| `categories.*.characters.*.portrait` | Image path of the character portrait (default: `portrait.png`) |
| `categories.*.characters.*.thumbnail` | Image path of the chracter thumbnail (default: `thumbnail.png`) |
| `categories.*.characters.*.random` | Indicates that this character is random one within category (default: `false`) |

Gamepad and keyboard mapping
----------------------------

You can download and execute [gamepad-logger.exe](https://github.com/mugen-launcher/gamepad-logger/releases/latest/download/gamepad-logger.exe) to fill the gamepad and keyboard mapping.

Application states
------------------

![States](./docs/state-machine.png)

Development
-----------

Requirement:  NodeJS >= 13

Install dependencies with:
```bash
npm ci
```

Launch in dev environment with:
```bash
npm start
```

Launch in MUGEN environment with:
```bash
npm start /path/to/mugen/directory
```

