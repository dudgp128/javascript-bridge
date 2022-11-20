/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;
  #currentIdx;
  #bridgeMap;
  #retryCount;

  constructor(bridge) {
    this.#bridge = bridge;
    this.#currentIdx = 0;
    this.#bridgeMap = [[], []]; // 0 ≒ D , 1 ≒ U
    this.#retryCount = 1;
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(input) {
    if (input === this.#bridge[this.#currentIdx]) {
      this.fillMap(input, "O");
      this.#currentIdx += 1;
      return this.#currentIdx == this.#bridge.length ? "성공" : "O";
    } else {
      this.fillMap(input, "X");
      return "X";
    }
  }

  fillMap(position, str) {
    const positionNumber = position == "U" ? 1 : 0;
    this.#bridgeMap[positionNumber].push(str);
    this.#bridgeMap[Number(!positionNumber)].push(" ");
  }

  getBridgeMap() {
    return this.#bridgeMap;
  }

  getRetryCount() {
    return this.#retryCount;
  }
  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.#retryCount += 1;
    this.#currentIdx = 0;
    this.#bridgeMap = [[], []];
  }
}

module.exports = BridgeGame;
