/// <reference path="../../typings/jquery/jquery.d.ts" />

namespace Demo.Views {
    export interface DropdownProps extends UIBuilder.Props {
        title: string;
    }

    /**
     * A dropdown control has exactly one child which the dropdown will initially hide.
     * The child will be shown when the dropdown button is clicked.
     * The child must be focusable and it will be given focus when shown.
     * The child must be set to position: absolute so that it will be displayed over adjacent elements.
     * The child must hide itself on blur.
     */
    export class Dropdown extends UIBuilder.Component<DropdownProps> {
        private child: HTMLElement;

        constructor(props: DropdownProps) {
            super(props);
        }

        private onClick(event: Event): void {
            $(this.child).show().focus();
        }

        public render(): HTMLElement {
            if (Array.isArray(this.props.children) && this.props.children.length != 1) {
                throw new Error("Dropdown must have exactly one child.");
            }

            this.child = this.props.children[0];
            if (!this.child.style) {
                throw new Error("Child of Dropdown must be an HTMLElement");
            }

            $(this.child).hide();

            return (
                <div className="dropdown">
                    <div className="dropdown-button" onClick={ev => this.onClick(ev)}>{this.props.title}</div>
                    {this.child}
                </div>
            );
        }
    }
}
