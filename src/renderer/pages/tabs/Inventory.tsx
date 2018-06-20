import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import { CharacterInventoryPositionEnum } from "@/protocol/enums/CharacterInventoryPositionEnum";
import Account from "@account";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import * as React from "react";

type style = "root" | "appBar" | "tab" | "table" | "overflow" | "tablecell";

const styles: StyleRulesCallback<style> = theme => ({
  appBar: {
    //
  },
  overflow: {
    maxHeight: "40vh",
    overflowY: "auto"
  },
  root: {
    flexGrow: 1
  },
  tab: {
    maxWidth: 1000,
    minWidth: 30
  },
  table: {
    minWidth: 700,
    textAlign: "center",
    verticalAlign: "middle"
  },
  tablecell: {
    textAlign: "center",
    verticalAlign: "middle"
  }
});

interface IProps {
  account: Account;
}

interface IState {
  value: number;
  deleteDropUseChoice: DeleteDropUseChoice;
  consumables: ObjectEntry[];
  equipments: ObjectEntry[];
  quantity: number;
  questObjects: ObjectEntry[];
  object: ObjectEntry;
  resources: ObjectEntry[];
  modal: boolean;
}

type Props = IProps & WithStyles<style>;

enum DeleteDropUseChoice {
  Delete,
  Drop,
  Use
}

class Inventory extends React.Component<Props, IState> {
  public state: IState = {
    consumables: [],
    deleteDropUseChoice: DeleteDropUseChoice.Delete,
    equipments: [],
    modal: false,
    object: null,
    quantity: -1,
    questObjects: [],
    resources: [],
    value: 0
  };

  public componentDidMount() {
    this.props.account.game.character.inventory.InventoryUpdated.on(
      this.inventoryUpdated
    );
  }

  public componentWillUnmount() {
    this.props.account.game.character.inventory.InventoryUpdated.off(
      this.inventoryUpdated
    );
  }

  public render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Tabs value={value} onChange={this.handleChange} fullWidth>
            <Tab
              className={classes.tab}
              label={LanguageManager.trans("equipments")}
            />
            <Tab
              className={classes.tab}
              label={LanguageManager.trans("consumables")}
            />
            <Tab
              className={classes.tab}
              label={LanguageManager.trans("resources")}
            />
            <Tab
              className={classes.tab}
              label={LanguageManager.trans("questobjects")}
            />
          </Tabs>
        </AppBar>

        <div className={classes.overflow}>
          <div style={{ display: value !== 0 ? "none" : "" }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tablecell} />
                  <TableCell className={classes.tablecell} numeric>
                    ID
                  </TableCell>
                  <TableCell className={classes.tablecell}>
                    {LanguageManager.trans("name")}
                  </TableCell>
                  <TableCell className={classes.tablecell} numeric>
                    {LanguageManager.trans("quantity")}
                  </TableCell>
                  <TableCell className={classes.tablecell}>
                    {LanguageManager.trans("position")}
                  </TableCell>
                  <TableCell className={classes.tablecell}>
                    {LanguageManager.trans("actions")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.equipments.map((e, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className={classes.tablecell}>
                        <img
                          width="40"
                          height="40"
                          src={e.iconUrl}
                          alt={e.name}
                        />
                      </TableCell>
                      <TableCell className={classes.tablecell} numeric>
                        {e.gid}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        {e.name}
                      </TableCell>
                      <TableCell className={classes.tablecell} numeric>
                        {e.quantity}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        {CharacterInventoryPositionEnum[e.position]}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        <Button
                          variant="raised"
                          size="small"
                          color="primary"
                          onClick={() => this.equipUnEquipItem(e)}
                        >
                          {e.position !==
                          CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
                            ? LanguageManager.trans("unequip")
                            : LanguageManager.trans("equip")}
                        </Button>
                        <Button
                          variant="raised"
                          size="small"
                          color="primary"
                          onClick={() => this.dropItem(e)}
                        >
                          {LanguageManager.trans("drop")}
                        </Button>
                        <Button
                          variant="raised"
                          size="small"
                          color="primary"
                          onClick={() => this.deleteItem(e)}
                        >
                          {LanguageManager.trans("delete")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div style={{ display: value !== 1 ? "none" : "" }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell numeric>ID</TableCell>
                  <TableCell>{LanguageManager.trans("name")}</TableCell>
                  <TableCell numeric>
                    {LanguageManager.trans("quantity")}
                  </TableCell>
                  <TableCell>{LanguageManager.trans("actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.consumables.map((c, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          width="40"
                          height="40"
                          src={c.iconUrl}
                          alt={c.name}
                        />
                      </TableCell>
                      <TableCell numeric>{c.gid}</TableCell>
                      <TableCell>{c.name}</TableCell>
                      <TableCell numeric>{c.quantity}</TableCell>
                      <TableCell>
                        <Button
                          variant="raised"
                          size="small"
                          color="primary"
                          onClick={() => this.useObject(c)}
                        >
                          {LanguageManager.trans("use")}
                        </Button>
                        <Button
                          variant="raised"
                          size="small"
                          color="primary"
                          onClick={() => this.dropItem(c)}
                        >
                          {LanguageManager.trans("drop")}
                        </Button>
                        <Button
                          variant="raised"
                          size="small"
                          color="primary"
                          onClick={() => this.deleteItem(c)}
                        >
                          {LanguageManager.trans("delete")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div style={{ display: value !== 2 ? "none" : "" }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell numeric>ID</TableCell>
                  <TableCell>{LanguageManager.trans("name")}</TableCell>
                  <TableCell numeric>
                    {LanguageManager.trans("quantity")}
                  </TableCell>
                  <TableCell>{LanguageManager.trans("actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.resources.map((r, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          width="40"
                          height="40"
                          src={r.iconUrl}
                          alt={r.name}
                        />
                      </TableCell>
                      <TableCell numeric>{r.gid}</TableCell>
                      <TableCell>{r.name}</TableCell>
                      <TableCell numeric>{r.quantity}</TableCell>
                      <TableCell>
                        <Button
                          variant="raised"
                          size="small"
                          color="primary"
                          onClick={() => this.dropItem(r)}
                        >
                          {LanguageManager.trans("drop")}
                        </Button>
                        <Button
                          variant="raised"
                          size="small"
                          color="primary"
                          onClick={() => this.deleteItem(r)}
                        >
                          {LanguageManager.trans("delete")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div style={{ display: value !== 3 ? "none" : "" }}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell numeric>ID</TableCell>
                  <TableCell>{LanguageManager.trans("name")}</TableCell>
                  <TableCell numeric>
                    {LanguageManager.trans("quantity")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.questObjects.map((q, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          width="40"
                          height="40"
                          src={q.iconUrl}
                          alt={q.name}
                        />
                      </TableCell>
                      <TableCell numeric>{q.gid}</TableCell>
                      <TableCell>{q.name}</TableCell>
                      <TableCell numeric>{q.quantity}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <Dialog
          open={this.state.modal}
          onClose={this.toggleModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.deleteDropUseChoice === DeleteDropUseChoice.Delete
              ? LanguageManager.trans("delete")
              : this.state.deleteDropUseChoice === DeleteDropUseChoice.Drop
                ? LanguageManager.trans("drop")
                : LanguageManager.trans("use")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.deleteDropUseChoice === DeleteDropUseChoice.Delete
                ? LanguageManager.trans("howManyDelete")
                : this.state.deleteDropUseChoice === DeleteDropUseChoice.Drop
                  ? LanguageManager.trans("howManyDrop")
                  : LanguageManager.trans("howManyUse")}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="number"
              label="Number"
              value={this.state.quantity}
              fullWidth
              onChange={this.handleQuantityChange("quantity")}
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleModal} color="secondary">
              {LanguageManager.trans("cancel")}
            </Button>
            <Button
              variant="raised"
              onClick={this.modalConfirm}
              color="primary"
            >
              {this.state.deleteDropUseChoice === DeleteDropUseChoice.Delete
                ? LanguageManager.trans("delete")
                : this.state.deleteDropUseChoice === DeleteDropUseChoice.Drop
                  ? LanguageManager.trans("drop")
                  : LanguageManager.trans("use")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private inventoryUpdated = (withObject: boolean) => {
    this.setState({
      consumables: this.props.account.game.character.inventory.consumables.ToArray(),
      equipments: this.props.account.game.character.inventory.equipments.ToArray(),
      questObjects: this.props.account.game.character.inventory.questObjects.ToArray(),
      resources: this.props.account.game.character.inventory.resources.ToArray()
    });
  };

  private modalConfirm = () => {
    if (this.state.deleteDropUseChoice === DeleteDropUseChoice.Delete) {
      this.props.account.game.character.inventory.deleteObject(
        this.state.object,
        this.state.quantity
      );
    } else if (this.state.deleteDropUseChoice === DeleteDropUseChoice.Drop) {
      this.props.account.game.character.inventory.dropObject(
        this.state.object,
        this.state.quantity
      );
    } else if (this.state.deleteDropUseChoice === DeleteDropUseChoice.Use) {
      this.props.account.game.character.inventory.useObject(
        this.state.object,
        this.state.quantity
      );
    }
    this.setState({ quantity: -1, object: null });
    this.toggleModal();
  };

  private handleChange = (event, value) => {
    this.setState({ value });
  };

  private handleQuantityChange = name => event => {
    this.setState({ [name]: event.target.value } as Pick<IState, keyof IState>);
  };

  private equipUnEquipItem = (obj: ObjectEntry) => {
    if (
      obj.position !==
      CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
    ) {
      this.props.account.game.character.inventory.unEquipObject(obj);
    } else {
      this.props.account.game.character.inventory.equipObject(obj);
    }
  };

  private dropItem = (obj: ObjectEntry) => {
    this.setState({
      deleteDropUseChoice: DeleteDropUseChoice.Drop,
      object: obj
    });
    this.toggleModal();
  };

  private deleteItem = (obj: ObjectEntry) => {
    this.setState({
      deleteDropUseChoice: DeleteDropUseChoice.Delete,
      object: obj
    });
    this.toggleModal();
  };

  private toggleModal = () => {
    this.setState(prevState => {
      return {
        modal: !prevState.modal
      };
    });
  };

  private useObject = (obj: ObjectEntry) => {
    this.setState({
      deleteDropUseChoice: DeleteDropUseChoice.Use,
      object: obj
    });
    this.toggleModal();
  };
}

export default withStyles(styles)<IProps>(Inventory);
