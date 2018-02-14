import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import * as React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import CookieMain from "../CookieMain";

interface IAddAccountFormProps {
  //
}

interface IAddAccountFormStates {
  //
}

export default class AddAccountForm extends React.Component<IAddAccountFormProps, IAddAccountFormStates> {

  constructor(props: IAddAccountFormProps) {
    super(props);

    this.state = {
      //
    };
  }

  public render() {
    return (
      <Form onSubmit={(event) => {
        event.preventDefault();
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("examplePassword") as HTMLInputElement).value;
        const server = (document.getElementById("server") as HTMLInputElement).value;
        const character = (document.getElementById("character") as HTMLInputElement).value;
        GlobalConfiguration.addAccountAndSave(username, password, server, character);
        CookieMain.refreshEntities();
      }}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="username" className="mr-sm-2">{LanguageManager.trans("username")}</Label>
          <Input type="text" name="text" id="username"/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">{LanguageManager.trans("password")}</Label>
          <Input type="password" name="password" id="examplePassword"/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="server" className="mr-sm-2">{LanguageManager.trans("server")}</Label>
          <Input type="text" name="text" id="server"/>
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="character" className="mr-sm-2">{LanguageManager.trans("character")}</Label>
          <Input type="text" name="text" id="character"/>
        </FormGroup>
        <br/>
        <Button size="sm">{LanguageManager.trans("add")}</Button>
      </Form>
    );
  }
}
