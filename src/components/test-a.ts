'use strict';

const Vue = require('vue/dist/vue');

export const template = `
<ui-section header="自动渲染 / Automatic rendering" expand>
    <div solt="content">
        <!-- 每一个  -->
        <ui-prop type="dump" class="list"></ui-prop>
        <ui-prop type="dump" class="num"></ui-prop>
        <ui-prop type="dump" class="color"></ui-prop>
    </div>
</ui-section>

<ui-section header="手动渲染 / Manual rendering" expand>
    <div solt="content">
        <ui-prop class="c-list">
            <ui-label value="TestList" slot="label"></ui-label>
            <ui-num-input slot="content" class="c-list-length-input" step="1" min="0"></ui-num-input>
            <div solt="child"></div>
        </ui-prop>


        <ui-prop class="c-num">
            <ui-label value="Num" slot="label"></ui-label>
            <ui-num-input slot="content" class="c-num-input"><ui-num-input>
        </ui-prop>

        <ui-prop class="c-color">
            <ui-label value="Color" slot="label"></ui-label>
            <ui-color slot="content" class="c-color-input"><ui-color>
        </ui-prop>
    </div>
</ui-section>
`;

export const $ = {
    'list': '.list',
    'num': '.num',
    'color': '.color',

    'cList': '.c-list',
    'cListLengthInput': '.c-list-length-input',
    'cListChild': '.c-list > div',
    'cNum': '.c-num',
    'cNumInput': '.c-num-input',
    'cColor': '.c-color',
    'cColorInput': '.c-color-input',

    'vue': '#vue',
};

export const style = ``;

export function update(this: any, dump: any) {
    // ---- 自动渲染，会自动挂上 dump 数据
    // ---- Automatic rendering, will automatically hang dump data
    this.$.list.render(dump.value.testList);
    this.$.num.render(dump.value.num);
    this.$.color.render(dump.value.color);

    // ---- 手动渲染，需要在每一个 ui-prop 上手动挂上 dump 数据，并且设置和提交数据
    // ---- Manual rendering requires manually hanging dump data on each UI-prop and setting and committing data
    this.$.cList.dump = dump.value.testList;
    const testList = dump.value.testList;
    // 数组比较麻烦，需要手动写 length 的操作
    // Array is cumbersome, need to manually write the length operation
    this.$.cListLengthInput.value = dump.value.testList.value.length;
    this.$.cListLengthInput.addEventListener('confirm', (event: any) => {
        const length = this.$.cListLengthInput.value;
        while (testList.value.length < length) {
            testList.value.push(JSON.parse(JSON.stringify(testList.elementTypeData)));
        }
        testList.value.length = length;
        this.$.cList.dispatch('change-dump');
    });
    // Manually write the children of the array
    this.$.cListChild.innerHTML = '';
    for (let i=0; i<testList.value.length; i++) {
        const childDump = testList.value[i];
        const $prop = document.createElement('ui-prop') as any;
        $prop.dump = childDump;

        const $div = document.createElement('div') as any;
        const $node = document.createElement('ui-node') as any;
        const $num = document.createElement('ui-num-input') as any;
        $node.setAttribute('droppable', 'cc.Node');
        $div.style.display = 'flex';
        $node.style.flex = 1;
        $num.style.flex = 1;
        $node.value = childDump.value.target.value.uuid;
        $num.value = childDump.value.num.value;
        $div.appendChild($node);
        $div.appendChild($num);
        $prop.appendChild($div);

        $node.addEventListener('confirm', () => {
            childDump.value.target.value.uuid = $node.value;
            $prop.dispatch('change-dump');
        });
        $num.addEventListener('confirm', () => {
            $prop.dump.value.num.value = $num.value - 0;
            $prop.dispatch('change-dump');
        });
        this.$.cListChild.appendChild($prop);
    }
    // num 渲染
    // num rendering
    this.$.cNum.dump = dump.value.num;
    this.$.cNumInput.value = dump.value.num.value;
    this.$.cNumInput.addEventListener('confirm', (event: any) => {
        dump.value.num.value = this.$.cNumInputInput.value - 0;
        this.$.cListLength.dispatch('change-dump');
    });
    // color 渲染
    // color rendering
    this.$.cColor.dump = dump.value.color;
    const color = dump.value.color.value;
    this.$.cColorInput.value = [color.r, color.g, color.b, color.a];
    this.$.cColorInput.addEventListener('confirm', (event: any) => {
        const color = this.$.cColorInput.value;
        dump.value.color.value = {
            r: color[0],
            g: color[1],
            b: color[2],
            a: color[3],
        };
        this.$.cColor.dispatch('change-dump');
    });
};

export function ready(this: any) {
    
};
