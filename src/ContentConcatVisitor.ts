import { Visitor } from './Node';

export class ContentConcatVisitor implements Visitor {
    private content: string = '';
    public visit (name: string, value: string) {
        this.content += name + value;
    }
    public getContent () {
        return this.content;
    }
}