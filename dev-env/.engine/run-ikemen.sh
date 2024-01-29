#/bin/bash

currentDirectory=$(dirname "$(realpath "$0")")
cd "$currentDirectory/Ikemen_GO"

configPath="../../save/config.json"
motifDirectory="../../../motifs"
lifebarDirectory="../../lifebars"
stageDirectory="../../../stages"
characterDirectory="../../../chars"

motif="motif/system.def"
lifebar="01/fight.def"
rounds=2
characterOneColor=1
characterTwoColor=1
characterTwoAI=0

for i in "$@"; do
  case $i in
    -motif=*)
      motif="${i#*=}"
      shift
      ;;
    -lifebar=*)
      lifebar="${i#*=}"
      shift
      ;;
    -p1=*)
      characterOne="${i#*=}"
      shift
      ;;
    -p1.color=*)
      characterOneColor="${i#*=}"
      shift
      ;;
    -p2=*)
      characterTwo="${i#*=}"
      shift
      ;;
    -p2.color=*)
      characterTwoColor="${i#*=}"
      shift
      ;;
    -p2.ai=*)
      characterTwoAI="${i#*=}"
      shift
      ;;
    -s=*)
      stage="${i#*=}"
      shift
      ;;
    -rounds=*)
      rounds="${i#*=}"
      shift
      ;;
    *)
      ;;
  esac
done

case "$OSTYPE" in
  darwin*) #echo "It's a Mac!!" ;
    ikemen="./Ikemen_GO_MacOS -AppleMagnifiedMode YES"
  ;;
  linux*)
    ikemen="./Ikemen_GO_Linux"
  ;;
  *)
    ikemen="./Ikemen_GO_Linux"
  ;;
esac

$ikemen \
  -config "$configPath" \
  -r "$motifDirectory/$motif" \
  -lifebar "$lifebarDirectory/$lifebar" \
  -s "$stageDirectory/$stage" \
  -rounds $rounds \
  -p1 "$characterDirectory/$characterOne" \
  -p1.color $characterOneColor \
  -p2 "$characterDirectory/$characterTwo" \
  -p2.color $characterTwoColor \
  -p2.ai $characterTwoAI
