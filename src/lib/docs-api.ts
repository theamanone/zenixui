interface DocContent {
  title: string;
  description: string;
  code?: string;
  usage?: string;
  props?: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
    default?: string;
  }>;
}

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database
const docsDatabase: Record<string, DocContent> = {
  'button': {
    title: 'Button Component',
    description: 'A versatile button component with multiple variants and states.',
    code: `import { Button } from '@/components/ui/button';

export default function Example() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  );
}`,
    props: [
      {
        name: 'variant',
        type: '"default" | "primary" | "secondary" | "outline"',
        description: 'The visual style of the button',
        default: 'default'
      },
      {
        name: 'size',
        type: '"sm" | "md" | "lg"',
        description: 'The size of the button',
        default: 'md'
      }
    ]
  },
  // Add more components...
};

export async function fetchDoc(id: string): Promise<DocContent | null> {
  await delay(800); // Simulate network delay
  return docsDatabase[id] || null;
}

export async function fetchAllDocs(): Promise<string[]> {
  await delay(400);
  return Object.keys(docsDatabase);
}
