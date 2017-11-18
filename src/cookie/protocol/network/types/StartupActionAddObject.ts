import ObjectItemInformationWithQuantity from "./ObjectItemInformationWithQuantity";
export default class StartupActionAddObject {
  public items: ObjectItemInformationWithQuantity[];
  public uid: number;
  public title: string;
  public text: string;
  public descUrl: string;
  public pictureUrl: string;
  constructor(uid = 0, title = "", text = "", descUrl = "", pictureUrl = "",
              items: ObjectItemInformationWithQuantity[] = null) {

    this.items = items;
    this.uid = uid;
    this.title = title;
    this.text = text;
    this.descUrl = descUrl;
    this.pictureUrl = pictureUrl;

  }
}
