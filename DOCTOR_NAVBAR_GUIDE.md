# Doctor Navbar Plus Component Guide

## Overview
The `DoctorNavbarPlus` component is a modern, responsive navigation bar designed for doctor dashboard pages. It follows the Tailwind Plus design pattern and provides a consistent user experience across all doctor-related pages.

## Features
- Responsive design that works on mobile and desktop
- Mobile-friendly hamburger menu
- Profile dropdown with user options
- Notification icon
- Brand logo with navigation
- Active state highlighting for current page

## How to Use

### 1. Import the Component
```jsx
import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
```

### 2. Add to Your Page
Place the component at the top of your page layout:
```jsx
<div className="min-h-screen bg-gray-50 pt-16">
  <DoctorNavbarPlus />
  {/* Your page content here */}
</div>
```

Note the `pt-16` class on the container div - this provides spacing for the fixed navbar.

### 3. Update Dependencies
Make sure you have the required dependencies in your project:
```bash
npm install @headlessui/react @heroicons/react
```

## Component Structure
The navbar includes:
- Mobile menu toggle button
- Brand logo (clickable to go to home)
- Navigation links (Dashboard, Appointments, Prescriptions, Patients)
- Notification bell icon
- User profile dropdown menu

## Styling
The component uses Tailwind CSS classes for styling and follows the Tailwind Plus design system. All colors and styles are consistent with the project's design language.

## Responsive Behavior
- On mobile screens (sm and below): Shows hamburger menu
- On tablet and desktop screens (md and above): Shows full navigation links
- The mobile menu uses Headless UI Disclosure component for smooth animations

## Customization
To customize the navigation links, modify the `navigation` array in the component:
```jsx
const navigation = [
  { name: 'الرئيسية', href: '/', current: location.pathname === '/' },
  { name: 'المواعيد', href: '/doctor/appointments', current: location.pathname === '/doctor/appointments' },
  { name: 'الروشتات', href: '/doctor/prescriptions', current: location.pathname === '/doctor/prescriptions' },
  { name: 'المرضى', href: '/doctor/patients', current: location.pathname === '/doctor/patients' },
];
```

## Profile Menu Options
The profile dropdown includes:
- Your profile
- Settings
- Sign out

## Profile Completion Warning
The component automatically shows a profile completion warning if the doctor hasn't completed their profile. This is based on checking `localStorage` for a `doctorProfile` item.

## Integration with Auth Context
The component uses the `useAuth` hook to access user information and handle logout functionality.

## Accessibility
The component follows accessibility best practices:
- Proper ARIA labels
- Keyboard navigation support
- Semantic HTML structure
- Focus management

## Testing
A basic test file is included at `src/components/__tests__/DoctorNavbarPlus.test.jsx` to ensure the component renders correctly.

## Migration from Old Navbar
To migrate from the old `DoctorNavbar` component:

1. Replace the import:
   ```jsx
   // Old
   import DoctorNavbar from '../../components/DoctorNavbar';
   
   // New
   import DoctorNavbarPlus from '../../components/DoctorNavbarPlus';
   ```

2. Replace the component usage:
   ```jsx
   // Old
   <DoctorNavbar />
   
   // New
   <DoctorNavbarPlus />
   ```

3. Make sure to add the `pt-16` class to your main container:
   ```jsx
   <div className="min-h-screen bg-gray-50 pt-16">
   ```

## Troubleshooting
If you encounter issues:

1. Make sure all dependencies are installed
2. Check that the AuthContext is properly set up
3. Verify that the navigation links match your routing structure
4. Ensure Tailwind CSS is properly configured in your project

## Contributing
To modify the navbar:
1. Edit `src/components/DoctorNavbarPlus.jsx`
2. Update tests if functionality changes
3. Test on both mobile and desktop views