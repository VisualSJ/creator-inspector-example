
import { _decorator, Component, Node, CCInteger, CCNumber, Color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TestA
 * DateTime = Thu Mar 10 2022 19:15:49 GMT+0800 (中国标准时间)
 * Author = 
 * FileBasename = TestA.ts
 * FileBasenameNoExtension = TestA
 * URL = db://assets/TestA.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('CustomTestObject')
export class TestObject {
    @property({
        type: Node,
    })
    target: Node | null = null;

    @property({
        type: CCInteger,
    })
    num: number = 0;
}
 
@ccclass('TestA')
export class TestA extends Component {
    @property({
        type: TestObject,
    })
    testList = [];

    @property({
        type: CCNumber
    })
    num = 0;

    @property({
        type: Color
    })
    color = new Color();

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
