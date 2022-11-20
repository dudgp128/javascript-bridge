const { Console } = require("@woowacourse/mission-utils");
const OutputView = require("../src/OutputView");
const BridgeMaker = require("../src/BridgeMaker");
const BridgeGame = require("../src/BridgeGame");

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  Game: undefined,

  readBridgeSize() {
    Console.readLine("다리의 길이를 입력해주세요.\n", (input) => {
      const bridge = BridgeMaker.canMakeBridge(Number(input));
      this.Game = new BridgeGame(bridge);
      this.readMoving();
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving() {
    Console.readLine(
      "이동할 칸을 선택해주세요. (위: U, 아래: D)\n",
      (input) => {
        const gameState = this.Game.move(input);
        const bridgeMap = this.Game.getBridgeMap();
        OutputView.printMap(bridgeMap);
        if (gameState == "O") {
          return this.readMoving();
        }
        if (gameState == "성공") {
          return OutputView.printResult(
            this.Game.getBridgeMap(),
            gameState,
            this.Game.getRetryCount()
          );
        }
        if (gameState == "X") {
          return this.readGameCommand("실패");
        }
      }
    );
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(result) {
    Console.readLine(
      "게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n",
      (input) => {
        if (input == "R") {
          this.Game.retry();
          return this.readMoving();
        }
        if (input == "Q") {
          return OutputView.printResult(
            this.Game.getBridgeMap(),
            result,
            this.Game.getRetryCount()
          );
        }
      }
    );
  },
};

module.exports = InputView;
