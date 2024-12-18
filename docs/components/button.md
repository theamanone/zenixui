# Button Component Documentation

The Button component is a versatile and customizable button element.

## Usage

```jsx
import { Button } from '@theamanone/react-ui';

function MyComponent() {
  return (
    <Button variant="primary" size="md">
      Click Me
    </Button>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' \| 'ghost' | 'primary' | Button style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| isLoading | boolean | false | Shows loading spinner |
