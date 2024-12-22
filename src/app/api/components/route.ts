import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const headersList = headers()
  const acceptHeader = headersList.get('accept')

  // Check for proper Accept header
  if (!acceptHeader?.includes('application/json')) {
    return NextResponse.json({
      errors: [{
        code: "media_type_not_acceptable",
        message: "The Accept header should send a media type of application/json"
      }],
      type: "error.list"
    }, { status: 406 })
  }

  // Mock data similar to Aceternity's response
  const response = {
    app: {
      name: "Enhancer",
      description: "Modern UI Components Library",
      version: "1.0.0",
    },
    components: [
      {
        id: "buttons",
        name: "Buttons",
        description: "Modern, animated button components",
        category: "inputs",
        variants: ["primary", "secondary", "outline"]
      },
      {
        id: "cards",
        name: "Cards",
        description: "Versatile card components with animations",
        category: "layout",
        variants: ["default", "hover", "interactive"]
      },
      {
        id: "inputs",
        name: "Input Fields",
        description: "Animated input components",
        category: "inputs",
        variants: ["text", "search", "animated"]
      }
    ],
    theme: {
      dark: {
        background: "#0c0a3e",
        foreground: "#ffffff",
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#2d2b70"
      },
      light: {
        background: "#ffffff",
        foreground: "#0c0a3e",
        primary: "#4f46e5",
        secondary: "#7c3aed",
        accent: "#e5e7eb"
      }
    }
  }

  return NextResponse.json(response)
}
