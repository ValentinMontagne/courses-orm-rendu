export class Player {
    id: number;
    name: string;
    level: number;
    health: number;
    mana: number;

    constructor(id: number, name: string, level: number, health: number, mana: number) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.health = health;
        this.mana = mana;
    }
}