interface FilterIconProps {
  active?: boolean;
}

export function FilterIcon(props: FilterIconProps) {
  const fill = () => (props.active ? "var(--hsl-bg)" : "var(--hsl)");
  return (
    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 0.891388V0.5H16.5V0.908211L10.4714 6.92685C10.2988 7.08292 10.1883 7.29742 10.1639 7.53108L10.1612 7.55697V7.583V14.4671L6.94945 13.3431V7.65808H6.9495L6.9494 7.65082C6.94586 7.4073 6.8449 7.177 6.67159 7.00879L0.5 0.891388ZM10.2355 14.5683L10.2359 14.5689L10.2355 14.5683ZM6.94945 13.4068V13.4058C6.94945 13.4062 6.94945 13.4065 6.94945 13.4068Z"
        fill={fill()}
        stroke={fill()}
      />
    </svg>
  );
}
