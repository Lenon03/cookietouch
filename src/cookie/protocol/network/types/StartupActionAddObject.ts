import ObjectItemInformationWithQuantity from "@/protocol/network/types/ObjectItemInformationWithQuantity";
import Type from "@/protocol/network/types/Type";

export default class StartupActionAddObject extends Type {
  public items: ObjectItemInformationWithQuantity[];
  public uid: number;
  public title: string;
  public text: string;
  public descUrl: string;
  public pictureUrl: string;

  constructor(
    uid = 0,
    title = "",
    text = "",
    descUrl = "",
    pictureUrl = "",
    items: ObjectItemInformationWithQuantity[] = []
  ) {
    super();
    this.items = items;
    this.uid = uid;
    this.title = title;
    this.text = text;
    this.descUrl = descUrl;
    this.pictureUrl = pictureUrl;
  }
}
