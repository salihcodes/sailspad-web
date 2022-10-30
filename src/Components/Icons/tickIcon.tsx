import * as React from "react";
interface Props {
  readonly noColor?: boolean;
}

export const TickIcon: React.FC<Props> = ({ noColor }: Props) => {
  return (
    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.8344 3.61858L0.65947 2.44365C0.528549 2.31273 0.320419 2.31273 0.189499 2.44365C0.0585785 2.57457 0.0585785 2.7827 0.189499 2.91362L1.59605 4.32018C1.72697 4.4511 1.93846 4.4511 2.06938 4.32018L5.62773 0.765183C5.75865 0.634262 5.75865 0.426132 5.62773 0.295212C5.49681 0.164291 5.28868 0.164291 5.15776 0.295212L1.8344 3.61858Z" fill="#455154" />
    </svg>
  );
};
