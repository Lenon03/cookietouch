import Data from "../Data";

export default class WorldMaps extends Data {
    public origineX: number;
    public origineY: number;
    public mapWidth: number;
    public mapHeight: number;
    public horizontalChunck: number;
    public verticalChunck: number;
    public viewableEverywhere: boolean;
    public minScale: number;
    public maxScale: number;
    public startScale: number;
    public centerX: number;
    public centerY: number;
    public totalWidth: number;
    public totalHeight: number;
    public zoom: string[];
}
