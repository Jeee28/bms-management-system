import { createRouter, createWebHistory } from 'vue-router'

// Public Pages
import PublicLayout from '@/layouts/PublicLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Home from '@/pages/Home.vue'
import News from '@/pages/News.vue'
import Complaint from '@/pages/Complaint.vue'
import Appointment from '@/pages/Appointment.vue'
import Request from '@/pages/Request.vue'
import Login from '@/pages/Login.vue'

// Admin
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminHome from '@/modules/admin/pages/Home.vue'
import CreateUser from '@/modules/admin/pages/CreateUser.vue'
import NewsUpdate from '@/modules/admin/pages/NewsUpdate.vue'

// Barangay
import BarangayLayout from '@/layouts/BarangayLayout.vue'
import BarangayHome from '@/modules/barangay/pages/Home.vue'
import Issuance from '@/modules/barangay/pages/Issuance.vue'
import InventoryBarangay from '@/modules/barangay/pages/Inventory.vue'
import AppointmentRecords from '@/modules/barangay/pages/AppointmentRecord.vue'
import Availability from '@/modules/barangay/pages/Availability.vue'
import Incident from '@/modules/barangay/pages/IncidentReport.vue'
import RequestRecord from '@/modules/barangay/pages/RequestRecord.vue'

// Healthcare
import HealthCareLayout from '@/layouts/HealthCareLayout.vue'
import HealthHome from '@/modules/healthcare/pages/Home.vue'
import Children from '@/modules/healthcare/pages/ChildrenRecord.vue'
import InventoryHealthcare from '@/modules/healthcare/pages/InventoryHealthcare.vue'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: { title: 'Home | Barangay Malabanban Norte Candelaria Quezon' },
      },
      {
        path: 'news',
        name: 'News',
        component: News,
        meta: { title: 'News | Barangay Malabanban Norte Candelaria Quezon' },
      },
      {
        path: 'complaint',
        name: 'Complaint',
        component: Complaint,
        meta: { title: 'Complaint | Barangay Malabanban Norte Candelaria Quezon' },
      },
      {
        path: 'appointment',
        name: 'Appointment',
        component: Appointment,
        meta: { title: 'Appointment | Barangay Malabanban Norte Candelaria Quezon' },
      },
      {
        path: 'request-documents',
        name: 'Request',
        component: Request,
        meta: { title: 'Document Request | Barangay Malabanban Norte Candelaria Quezon' },
      },
    ],
  },

  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', name: 'Login', component: Login }],
  },

  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'AdminHome', component: AdminHome },
      { path: 'create-user', name: 'CreateUser', component: CreateUser },
      { path: 'news', name: 'NewsUpdate', component: NewsUpdate },
    ],
  },

  {
    path: '/barangay',
    component: BarangayLayout,
    children: [
      { path: '', name: 'BarangayHome', component: BarangayHome },
      { path: 'issuance', name: 'Issuance', component: Issuance },
      { path: 'record', name: 'RequestRecord', component: RequestRecord },
      { path: 'appointment', name: 'AppointmentRecords', component: AppointmentRecords },
      { path: 'availability', name: 'Availability', component: Availability },
      { path: 'complaint', name: 'Incident', component: Incident },
      { path: 'inventory', name: 'Inventory', component: InventoryBarangay },
    ],
  },

  {
    path: '/healthcare',
    component: HealthCareLayout,
    children: [
      {
        path: '',
        name: 'HealthHome',
        component: HealthHome,
        meta: { title: 'Healthcare | Barangay Malabanban Norte Candelaria Quezon' },
      },
      {
        path: 'inventory',
        name: 'InventoryHealthcare',
        component: InventoryHealthcare,
        meta: { title: 'Healthcare Inventory | Barangay Malabanban Norte Candelaria Quezon' },
      },
      {
        path: 'inventory/add',
        name: 'AddInventory',
        component: () => import('@/modules/healthcare/pages/AddInventory.vue'),
      },
      {
        path: 'inventory/edit',
        name: 'EditInventory',
        component: () => import('@/modules/healthcare/pages/EditInventory.vue'),
      },
      {
        path: 'children',
        name: 'Children',
        component: Children,
      },
      {
        path: 'children/add',
        name: 'AddChild',
        component: () => import('@/modules/healthcare/pages/AddChildren.vue'),
      },
      {
        path: 'children/edit',
        name: 'EditChild',
        component: () => import('@/modules/healthcare/pages/EditChildren.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// --- Update Document Title
router.afterEach((to) => {
  const nearestTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title)
  if (nearestTitle) {
    document.title = nearestTitle.meta.title
  } else {
    document.title = 'My Barangay App'
  }
})

export default router
