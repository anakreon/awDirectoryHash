export interface Visitor {
    visit (name: string, value: string): void;
}

export class Node {
    private value: string = '';
    private childNodes: Node[] = [];
    constructor (private name: string) {}

    public setValue (value: string) {
        this.value = value;
    }
    
    public addChild (child: Node): void {
        this.childNodes.push(child);
    }

    public visit (visitor: Visitor) {
        visitor.visit(this.name, this.value);
    }

    public visitChildren (visitor: Visitor) {
        this.childNodes.forEach((node: Node) => node.visit(visitor));
    }
}