import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export class Todo extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public completed!: boolean;
}

Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'Todo',
    }
);
