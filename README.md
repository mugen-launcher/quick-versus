Quick Versus Launcher for MUGEN
===============================

Launch a MUGEN fight without displaying the screenpack.

![Video 1](./docs/video-1.gif)

Navigation
----------

| Button | Description                      |
| ------ | -------------------------------- |
| `A`    | Confirm                          |
| `B`    | Cancel                           |
| `X`    | Previous category                |
| `Y`    | Next category                    |
| `Z`    | Switch mode (Training or Versus) |

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
      "left": "A17",
      "right": "A18",
      "up": "A19",
      "down": "A20",
      "a": "A0",
      "b": "A1",
      "c": "A7",
      "x": "A2",
      "y": "A3",
      "z": "A6",
      "escape": "A8",
      "enter": "A9"
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
      "left": "B17",
      "right": "B18",
      "up": "B19",
      "down": "B20",
      "a": "B0",
      "b": "B1",
      "c": "B7",
      "x": "B2",
      "y": "B3",
      "z": "B6",
      "escape": "B8",
      "enter": "B9"
    }
  }
}
```

Characters are organized by category.
Each category has an image (displayed on top of the screen).
For each character, you need to provide the definition path.

Properties
-------------------

| Name | Description |
| ---- | ----------- |
| `width` | Application width (default: `1024`) |
| `height` | Application height (default: `576`) |
| `fullscreen` | Fullscreen (default: `false`) |
| `frame` | Application with frame (default: `false`) |
| `background` | Image path of the background |
| `sound` | File path of the sound |
| `motif` | Motif name |
| `characterColumns` | Number of columns to display character thumbnails (default: `1`) |
| `categories.*.random` | Indicates that the category is a random selection (default: `false`) |
| `categories.*.characters.*.portrait` | Image path of the character portrait (default: `portrait.png`) |
| `categories.*.characters.*.portraitOptions.x` | Portrait x coordinates (default: `50vw`) |
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

