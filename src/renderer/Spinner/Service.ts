import { Spinner } from "./";

export class SpinnerService {
  private spinnerCache = new Set<Spinner>();

  public show(spinnerName: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.name === spinnerName) {
        spinner.show = true;
      }
    });
  }

  public hide(spinnerName: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.name === spinnerName) {
        spinner.show = false;
      }
    });
  }

  public showGroup(spinnerGroup: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.group === spinnerGroup) {
        spinner.show = true;
      }
    });
  }

  public hideGroup(spinnerGroup: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.group === spinnerGroup) {
        spinner.show = false;
      }
    });
  }

  public showAll(): void {
    this.spinnerCache.forEach(spinner => (spinner.show = true));
  }

  public hideAll(): void {
    this.spinnerCache.forEach(spinner => (spinner.show = false));
  }

  public isShowing(spinnerName: string): boolean | undefined {
    let showing: boolean;
    this.spinnerCache.forEach(spinner => {
      if (spinner.name === spinnerName) {
        showing = spinner.show;
      }
    });
    return showing;
  }

  public register(spinner: Spinner): void {
    this.spinnerCache.add(spinner);
  }

  public unregister(spinnerToRemove: Spinner): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner === spinnerToRemove) {
        this.spinnerCache.delete(spinner);
      }
    });
  }

  public unregisterGroup(spinnerGroup: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.group === spinnerGroup) {
        this.spinnerCache.delete(spinner);
      }
    });
  }

  public unregisterAll(): void {
    this.spinnerCache.clear();
  }
}

const spinnerService = new SpinnerService();
export { spinnerService };
