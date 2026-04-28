<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "$src/composables";
import SunIcon from "$icons/SunIcon.vue";

import Button from "$lib/components/forms/Button.vue";
import Input from "$lib/components/forms/Input.vue";
import TextArea from "$lib/components/forms/TextArea.vue";
import Select from "$lib/components/forms/Select.vue";
import Checkbox from "$lib/components/forms/Checkbox.vue";
import Radio from "$lib/components/forms/Radio.vue";
import Switch from "$lib/components/forms/Switch.vue";
import Label from "$lib/components/forms/Label.vue";
import Alert from "$lib/components/feedback/Alert.vue";
import Badge from "$lib/components/feedback/Badge.vue";
import Spinner from "$lib/components/feedback/Spinner.vue";
import Modal from "$lib/components/overlay/Modal.vue";
import Heading from "$lib/components/typography/Heading.vue";
import Text from "$lib/components/typography/Text.vue";

const { toggleTheme, isDarkTheme } = useTheme();

const inputValue = ref("");
const textareaValue = ref("");
const selectValue = ref("");
const checkboxValue = ref(false);
const checkboxIndeterminate = ref(true);
const radioValue = ref("a");
const switchValue = ref(false);
const switchOn = ref(true);
const modalOpen = ref(false);
const activeSection = ref("colors");

const sections = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "shadows", label: "Shadows" },
  { id: "radius", label: "Radius" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "textarea", label: "TextArea" },
  { id: "select", label: "Select" },
  { id: "controls", label: "Controls" },
  { id: "labels", label: "Labels" },
  { id: "alerts", label: "Alerts" },
  { id: "badges", label: "Badges" },
  { id: "spinners", label: "Spinners" },
  { id: "modal", label: "Modal" },
];

function handleIntersection(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      activeSection.value = entry.target.id;
    }
  }
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(handleIntersection, {
    rootMargin: "-20% 0px -70% 0px",
  });
  for (const s of sections) {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="layout">
    <nav class="sidebar">
      <div class="sidebar-inner">
        <a href="#" class="sidebar-brand">
          <span class="sidebar-brand-mark">DS</span>
          <span class="sidebar-brand-text">Design System</span>
        </a>
        <ul class="sidebar-nav">
          <li class="sidebar-group-label">Foundations</li>
          <li v-for="s in sections.slice(0, 5)" :key="s.id">
            <a
              :href="`#${s.id}`"
              :class="['sidebar-link', activeSection === s.id && 'sidebar-link--active']"
              >{{ s.label }}</a
            >
          </li>
          <li class="sidebar-group-label">Components</li>
          <li v-for="s in sections.slice(5)" :key="s.id">
            <a
              :href="`#${s.id}`"
              :class="['sidebar-link', activeSection === s.id && 'sidebar-link--active']"
              >{{ s.label }}</a
            >
          </li>
        </ul>
        <button class="theme-toggle" @click="toggleTheme">
          <SunIcon />
          <span>{{ isDarkTheme ? "Dark" : "Light" }}</span>
        </button>
      </div>
    </nav>

    <main class="content">
      <div class="content-header">
        <p class="page-eyebrow">Unicode Lookup</p>
        <h1 class="page-title">Design System</h1>
        <p class="page-subtitle">
          A reference of every token, primitive, and component available in the project.
        </p>
        <div class="header-rule" />
      </div>

      <!-- Colors -->
      <section id="colors" class="section">
        <div class="section-header">
          <h2 class="section-title">Colors</h2>
          <p class="section-desc">HSL-based color system with light and dark theme support.</p>
        </div>

        <div class="card">
          <h3 class="card-label">Theme</h3>
          <div class="swatch-row">
            <div
              v-for="c in [
                { var: 'color-bg', label: 'bg' },
                { var: 'color-bg-offset', label: 'bg-offset' },
                { var: 'color-bg-elevated', label: 'bg-elevated' },
                { var: 'color-bg-input', label: 'bg-input' },
              ]"
              :key="c.var"
              class="swatch"
            >
              <div class="swatch-fill" :style="{ background: `var(--${c.var})` }" />
              <span class="swatch-name">{{ c.label }}</span>
            </div>
          </div>
          <div class="swatch-row">
            <div
              v-for="c in [
                { var: 'color-text', label: 'text' },
                { var: 'color-text-secondary', label: 'text-secondary' },
                { var: 'color-text-tertiary', label: 'text-tertiary' },
                { var: 'color-text-primary', label: 'text-primary' },
              ]"
              :key="c.var"
              class="swatch"
            >
              <div class="swatch-fill" :style="{ background: `var(--${c.var})` }" />
              <span class="swatch-name">{{ c.label }}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-label">Primary</h3>
          <div class="swatch-row">
            <div
              v-for="c in [
                { var: 'color-primary', label: 'primary' },
                { var: 'color-primary-bg', label: 'primary-bg' },
                { var: 'color-primary-hover', label: 'primary-hover' },
                { var: 'color-primary-active', label: 'primary-active' },
              ]"
              :key="c.var"
              class="swatch"
            >
              <div class="swatch-fill" :style="{ background: `var(--${c.var})` }" />
              <span class="swatch-name">{{ c.label }}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-label">Semantic</h3>
          <div class="semantic-grid">
            <div
              v-for="name in ['success', 'warning', 'error', 'info']"
              :key="name"
              class="semantic-pair"
            >
              <div class="semantic-fills">
                <div
                  class="swatch-fill swatch-fill--sm"
                  :style="{ background: `var(--color-${name})` }"
                />
                <div
                  class="swatch-fill swatch-fill--sm"
                  :style="{
                    background: `var(--color-${name}-bg)`,
                    border: `1px solid var(--color-${name}-border)`,
                  }"
                />
              </div>
              <span class="swatch-name">{{ name }}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-label">Border &amp; Link</h3>
          <div class="swatch-row">
            <div
              v-for="c in [
                { var: 'color-border', label: 'border' },
                { var: 'color-border-focus', label: 'border-focus' },
                { var: 'color-link', label: 'link' },
                { var: 'color-link-visited', label: 'link-visited' },
              ]"
              :key="c.var"
              class="swatch"
            >
              <div class="swatch-fill" :style="{ background: `var(--${c.var})` }" />
              <span class="swatch-name">{{ c.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Typography -->
      <section id="typography" class="section">
        <div class="section-header">
          <h2 class="section-title">Typography</h2>
          <p class="section-desc">System font stack with a harmonious type scale.</p>
        </div>

        <div class="card">
          <h3 class="card-label">Headings</h3>
          <div class="type-scale">
            <div v-for="h in [1, 2, 3, 4, 5, 6]" :key="h" class="type-scale-row">
              <Heading :level="h as any">Heading {{ h }}</Heading>
              <span class="type-meta">h{{ h }}</span>
            </div>
          </div>
        </div>

        <div class="card-row">
          <div class="card card--flush">
            <h3 class="card-label">Sizes</h3>
            <div class="type-list">
              <div
                v-for="s in [
                  { size: '4xl', px: '36' },
                  { size: '3xl', px: '30' },
                  { size: '2xl', px: '24' },
                  { size: 'xl', px: '20' },
                  { size: 'lg', px: '18' },
                  { size: 'base', px: '16' },
                  { size: 'sm', px: '14' },
                  { size: 'xs', px: '12' },
                ]"
                :key="s.size"
                class="type-row"
              >
                <Text :size="s.size as any" as="span">Aa</Text>
                <span class="type-meta"
                  >{{ s.size }}<span class="type-dim"> / {{ s.px }}px</span></span
                >
              </div>
            </div>
          </div>

          <div class="card card--flush">
            <h3 class="card-label">Weights</h3>
            <div class="type-list">
              <div
                v-for="w in [
                  { weight: 'normal', value: '400' },
                  { weight: 'medium', value: '500' },
                  { weight: 'semibold', value: '600' },
                  { weight: 'bold', value: '700' },
                ]"
                :key="w.weight"
                class="type-row"
              >
                <Text :weight="w.weight as any" size="lg" as="span">The quick brown fox</Text>
                <span class="type-meta"
                  >{{ w.weight }}<span class="type-dim"> / {{ w.value }}</span></span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-label">Colors</h3>
          <div class="type-colors">
            <div
              v-for="c in [
                { color: 'base', label: 'Base' },
                { color: 'secondary', label: 'Secondary' },
                { color: 'tertiary', label: 'Tertiary' },
                { color: 'primary', label: 'Primary' },
                { color: 'error', label: 'Error' },
                { color: 'success', label: 'Success' },
              ]"
              :key="c.color"
              class="type-color-item"
            >
              <Text :color="c.color as any" size="lg">{{ c.label }} text color</Text>
            </div>
          </div>
        </div>
      </section>

      <!-- Spacing -->
      <section id="spacing" class="section">
        <div class="section-header">
          <h2 class="section-title">Spacing</h2>
          <p class="section-desc">4px base unit scale for consistent spatial rhythm.</p>
        </div>

        <div class="card">
          <div class="spacing-list">
            <div
              v-for="s in [
                { key: 1, px: 4 },
                { key: 2, px: 8 },
                { key: 3, px: 12 },
                { key: 4, px: 16 },
                { key: 5, px: 20 },
                { key: 6, px: 24 },
                { key: 8, px: 32 },
                { key: 10, px: 40 },
                { key: 12, px: 48 },
                { key: 16, px: 64 },
                { key: 20, px: 80 },
              ]"
              :key="s.key"
              class="spacing-row"
            >
              <span class="spacing-label">{{ s.key }}</span>
              <div class="spacing-track">
                <div class="spacing-bar" :style="{ width: `var(--space-${s.key})` }" />
              </div>
              <span class="spacing-px">{{ s.px }}px</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Shadows -->
      <section id="shadows" class="section">
        <div class="section-header">
          <h2 class="section-title">Shadows</h2>
          <p class="section-desc">Elevation system for layering and depth.</p>
        </div>

        <div class="card">
          <div class="shadow-strip">
            <div v-for="s in ['xs', 'sm', 'base', 'md', 'lg', 'xl']" :key="s" class="shadow-item">
              <div class="shadow-box" :style="{ boxShadow: `var(--shadow-${s})` }" />
              <span class="shadow-label">{{ s }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Border Radius -->
      <section id="radius" class="section">
        <div class="section-header">
          <h2 class="section-title">Border Radius</h2>
          <p class="section-desc">Corner rounding tokens from sharp to pill.</p>
        </div>

        <div class="card">
          <div class="radius-strip">
            <div
              v-for="r in [
                { key: 'none', px: '0' },
                { key: 'sm', px: '2' },
                { key: 'base', px: '3' },
                { key: 'md', px: '4' },
                { key: 'lg', px: '6' },
                { key: 'xl', px: '8' },
                { key: '2xl', px: '12' },
                { key: 'full', px: '9999' },
              ]"
              :key="r.key"
              class="radius-item"
            >
              <div class="radius-shape" :style="{ borderRadius: `var(--radius-${r.key})` }" />
              <span class="radius-label">{{ r.key }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section id="buttons" class="section">
        <div class="section-header">
          <h2 class="section-title">Buttons</h2>
          <p class="section-desc">Action triggers with multiple variants and sizes.</p>
        </div>

        <div class="card">
          <h3 class="card-label">Variants</h3>
          <div class="demo-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div class="card-row">
          <div class="card card--flush">
            <h3 class="card-label">Sizes</h3>
            <div class="demo-row demo-row--center">
              <Button size="sm">Small</Button>
              <Button size="base">Base</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div class="card card--flush">
            <h3 class="card-label">States</h3>
            <div class="demo-row demo-row--center">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-label">Custom Hue</h3>
          <div class="demo-row">
            <Button :hue="0">Red (0)</Button>
            <Button :hue="30">Orange (30)</Button>
            <Button :hue="120">Green (120)</Button>
            <Button :hue="200">Blue (200)</Button>
            <Button :hue="270">Purple (270)</Button>
            <Button :hue="330">Pink (330)</Button>
          </div>
        </div>

        <div class="card">
          <h3 class="card-label">Full Width</h3>
          <Button full-width>Full Width Button</Button>
        </div>
      </section>

      <!-- Inputs -->
      <section id="inputs" class="section">
        <div class="section-header">
          <h2 class="section-title">Inputs</h2>
          <p class="section-desc">Text input fields with validation and size variants.</p>
        </div>

        <div class="card-row">
          <div class="card card--flush">
            <h3 class="card-label">Sizes</h3>
            <div class="field-stack">
              <Input size="sm" placeholder="Small input" full-width />
              <Input size="base" placeholder="Base input" full-width />
              <Input size="lg" placeholder="Large input" full-width />
            </div>
          </div>

          <div class="card card--flush">
            <h3 class="card-label">States</h3>
            <div class="field-stack">
              <div>
                <Label size="sm">Default</Label>
                <Input v-model="inputValue" placeholder="Type something..." full-width />
              </div>
              <div>
                <Label size="sm">Error</Label>
                <Input model-value="bad value" error="This field is required" full-width />
              </div>
              <div>
                <Label size="sm">Disabled</Label>
                <Input model-value="Can't edit" disabled full-width />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TextArea -->
      <section id="textarea" class="section">
        <div class="section-header">
          <h2 class="section-title">TextArea</h2>
          <p class="section-desc">Multi-line text input with resize control.</p>
        </div>

        <div class="card-row">
          <div class="card card--flush">
            <div class="field-stack">
              <div>
                <Label size="sm">Default</Label>
                <TextArea
                  v-model="textareaValue"
                  placeholder="Write something..."
                  full-width
                  :rows="3"
                />
              </div>
            </div>
          </div>
          <div class="card card--flush">
            <div class="field-stack">
              <div>
                <Label size="sm">With Error</Label>
                <TextArea model-value="oops" error="Content is too short" full-width :rows="3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Select -->
      <section id="select" class="section">
        <div class="section-header">
          <h2 class="section-title">Select</h2>
          <p class="section-desc">Dropdown selection menus.</p>
        </div>

        <div class="card">
          <div class="demo-row">
            <div class="field-group">
              <Label size="sm">Default</Label>
              <Select
                v-model="selectValue"
                :options="['Apple', 'Banana', 'Cherry']"
                placeholder="Pick a fruit"
              />
            </div>
            <div class="field-group">
              <Label size="sm">Small</Label>
              <Select size="sm" :options="['A', 'B', 'C']" placeholder="Pick" />
            </div>
            <div class="field-group">
              <Label size="sm">Error</Label>
              <Select :options="['X']" error="Required" />
            </div>
            <div class="field-group">
              <Label size="sm">Disabled</Label>
              <Select :options="['Locked']" disabled />
            </div>
          </div>
        </div>
      </section>

      <!-- Checkbox, Radio, Switch -->
      <section id="controls" class="section">
        <div class="section-header">
          <h2 class="section-title">Controls</h2>
          <p class="section-desc">Toggle and selection controls.</p>
        </div>

        <div class="card-row card-row--thirds">
          <div class="card card--flush">
            <h3 class="card-label">Checkbox</h3>
            <div class="control-stack">
              <Checkbox v-model="checkboxValue" label="Default" />
              <Checkbox :model-value="true" label="Checked" />
              <Checkbox
                :model-value="false"
                :indeterminate="checkboxIndeterminate"
                label="Indeterminate"
              />
              <Checkbox disabled label="Disabled" />
              <Checkbox :model-value="false" error="Required" label="Error" />
            </div>
          </div>

          <div class="card card--flush">
            <h3 class="card-label">Radio</h3>
            <div class="control-stack">
              <Radio v-model="radioValue" name="demo" value="a" label="Option A" />
              <Radio v-model="radioValue" name="demo" value="b" label="Option B" />
              <Radio v-model="radioValue" name="demo" value="c" label="Option C" />
              <Radio name="demo-d" value="x" label="Disabled" disabled />
            </div>
          </div>

          <div class="card card--flush">
            <h3 class="card-label">Switch</h3>
            <div class="control-stack">
              <Switch v-model="switchValue" label="Off" />
              <Switch v-model="switchOn" label="On" />
              <Switch size="sm" label="Small" />
              <Switch size="lg" label="Large" />
              <Switch disabled label="Disabled" />
            </div>
          </div>
        </div>
      </section>

      <!-- Labels -->
      <section id="labels" class="section">
        <div class="section-header">
          <h2 class="section-title">Labels</h2>
          <p class="section-desc">Form field labels with optional/required indicators.</p>
        </div>

        <div class="card">
          <div class="demo-row demo-row--center">
            <Label>Default</Label>
            <Label required>Required</Label>
            <Label optional>Optional</Label>
            <Label size="sm">Small</Label>
            <Label size="lg">Large</Label>
          </div>
        </div>
      </section>

      <!-- Alerts -->
      <section id="alerts" class="section">
        <div class="section-header">
          <h2 class="section-title">Alerts</h2>
          <p class="section-desc">Contextual feedback messages for user actions.</p>
        </div>

        <div class="card">
          <div class="alert-stack">
            <Alert variant="info" title="Information"
              >This is an informational message with helpful context.</Alert
            >
            <Alert variant="success" title="Success">The operation completed successfully.</Alert>
            <Alert variant="warning" title="Warning"
              >Please review your input before proceeding.</Alert
            >
            <Alert variant="error" title="Error">Something went wrong. Please try again.</Alert>
            <Alert variant="info" dismissible>Dismissible alert -- click the close button.</Alert>
          </div>
        </div>
      </section>

      <!-- Badges -->
      <section id="badges" class="section">
        <div class="section-header">
          <h2 class="section-title">Badges</h2>
          <p class="section-desc">Compact status indicators and labels.</p>
        </div>

        <div class="card">
          <h3 class="card-label">Variants</h3>
          <div class="demo-row">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        <div class="card-row">
          <div class="card card--flush">
            <h3 class="card-label">Sizes</h3>
            <div class="demo-row demo-row--center">
              <Badge size="sm">Small</Badge>
              <Badge size="base">Base</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>

          <div class="card card--flush">
            <h3 class="card-label">Options</h3>
            <div class="demo-row demo-row--center">
              <Badge pill variant="primary">Pill</Badge>
              <Badge dot variant="success">Dot</Badge>
              <Badge pill dot variant="error">Pill + Dot</Badge>
            </div>
          </div>
        </div>
      </section>

      <!-- Spinners -->
      <section id="spinners" class="section">
        <div class="section-header">
          <h2 class="section-title">Spinners</h2>
          <p class="section-desc">Loading indicators for async operations.</p>
        </div>

        <div class="card">
          <div class="demo-row demo-row--center" style="gap: var(--space-8)">
            <div class="spinner-demo">
              <Spinner size="sm" />
              <span class="mono-label">sm</span>
            </div>
            <div class="spinner-demo">
              <Spinner size="base" />
              <span class="mono-label">base</span>
            </div>
            <div class="spinner-demo">
              <Spinner size="lg" />
              <span class="mono-label">lg</span>
            </div>
            <div class="spinner-demo">
              <Spinner size="xl" />
              <span class="mono-label">xl</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal -->
      <section id="modal" class="section">
        <div class="section-header">
          <h2 class="section-title">Modal</h2>
          <p class="section-desc">Overlay dialog for focused interactions.</p>
        </div>

        <div class="card">
          <Button variant="outline" @click="modalOpen = true">Open Modal</Button>
          <Modal :open="modalOpen" @close="modalOpen = false">
            <div class="modal-demo">
              <Heading :level="3" size="lg">Dialog Title</Heading>
              <Text color="secondary">Click outside or press Escape to close this dialog.</Text>
              <div class="modal-actions">
                <Button variant="ghost" @click="modalOpen = false">Cancel</Button>
                <Button @click="modalOpen = false">Confirm</Button>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");

body {
  overflow-y: scroll;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
/* ============================================
   LAYOUT
   ============================================ */
.layout {
  display: flex;
  min-height: 100vh;
  font-family: "Inter", var(--font-family-base);
}

/* ============================================
   SIDEBAR
   ============================================ */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 210px;
  height: 100vh;
  background: var(--color-bg);
  z-index: var(--z-sticky);
  border-right: none;
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-8) 0 var(--space-6);
  overflow-y: auto;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-6);
  margin-bottom: var(--space-8);
  text-decoration: none;
}

.sidebar-brand:hover {
  text-decoration: none;
}

.sidebar-brand-mark {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.sidebar-brand-text {
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}

.sidebar-group-label {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: var(--space-4) var(--space-6) var(--space-2);
}

.sidebar-link {
  display: block;
  padding: 6px var(--space-6);
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-tertiary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
  letter-spacing: -0.005em;
}

.sidebar-link:visited {
  color: var(--color-text-tertiary);
}

.sidebar-link:hover {
  color: var(--color-text);
  text-decoration: none;
}

.sidebar-link--active {
  color: var(--color-text);
  font-weight: 500;
}

.sidebar-link--active:visited {
  color: var(--color-text);
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-4) var(--space-5) 0;
  padding: 6px var(--space-3);
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-tertiary);
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  transition:
    color var(--duration-fast),
    background var(--duration-fast);
  font-family: "Inter", var(--font-family-base);
}

.theme-toggle:hover {
  color: var(--color-text);
  background: var(--color-bg-active);
}

.theme-toggle :deep(svg) {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

/* ============================================
   CONTENT
   ============================================ */
.content {
  flex: 1;
  margin-left: 210px;
  padding: var(--space-12) var(--space-12) var(--space-20);
  max-width: 820px;
}

/* ============================================
   PAGE HEADER
   ============================================ */
.content-header {
  margin-bottom: var(--space-16);
}

.page-eyebrow {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 var(--space-3);
}

.page-title {
  font-size: 2.75rem;
  font-weight: 300;
  color: var(--color-text);
  letter-spacing: -0.035em;
  line-height: 1.1;
  margin: 0;
}

.page-subtitle {
  margin: var(--space-4) 0 0;
  font-size: var(--font-size-base);
  font-weight: 300;
  color: var(--color-text-tertiary);
  line-height: var(--line-height-relaxed);
  max-width: 480px;
}

.header-rule {
  width: 40px;
  height: 1px;
  background: var(--color-border);
  margin-top: var(--space-8);
}

/* ============================================
   SECTIONS
   ============================================ */
.section {
  margin-bottom: var(--space-16);
  scroll-margin-top: var(--space-8);
}

.section-header {
  margin-bottom: var(--space-6);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 400;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.02em;
}

.section-desc {
  margin: var(--space-1) 0 0;
  font-size: 13px;
  font-weight: 300;
  color: var(--color-text-tertiary);
}

/* ============================================
   CARDS
   ============================================ */
.card {
  background: transparent;
  border: none;
  border-top: 1px solid var(--color-border);
  border-radius: 0;
  padding: var(--space-6) 0;
  margin-bottom: 0;
}

.card-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 var(--space-5);
}

.card-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 var(--space-10);
  border-top: 1px solid var(--color-border);
}

.card-row--thirds {
  grid-template-columns: 1fr 1fr 1fr;
}

.card--flush {
  border-top: none;
  padding-top: var(--space-6);
  margin-bottom: 0;
}

/* ============================================
   COLOR SWATCHES
   ============================================ */
.swatch-row {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.swatch-row:last-child {
  margin-bottom: 0;
}

.swatch {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.swatch-fill {
  height: 44px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(128, 128, 128, 0.12);
  transition:
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.swatch:hover .swatch-fill {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.swatch-fill--sm {
  height: 28px;
}

.swatch-name {
  font-size: 10.5px;
  font-family: var(--font-family-mono);
  font-weight: 400;
  color: var(--color-text-tertiary);
  letter-spacing: 0.01em;
}

.semantic-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}

.semantic-pair {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.semantic-fills {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

/* ============================================
   TYPOGRAPHY DEMOS
   ============================================ */
.type-scale {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.type-scale-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: var(--space-3) 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.06);
}

.type-scale-row:last-child {
  border-bottom: none;
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.type-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.06);
}

.type-row:last-child {
  border-bottom: none;
}

.type-meta {
  font-size: 11px;
  font-family: var(--font-family-mono);
  font-weight: 400;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}

.type-dim {
  opacity: 0.5;
}

.type-colors {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.type-color-item {
  padding: var(--space-3) 0;
}

/* ============================================
   SPACING
   ============================================ */
.spacing-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.spacing-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 5px 0;
  transition: background var(--duration-fast);
  border-radius: var(--radius-sm);
}

.spacing-row:hover {
  background: rgba(128, 128, 128, 0.04);
}

.spacing-label {
  width: 24px;
  font-size: 11px;
  font-family: var(--font-family-mono);
  font-weight: 400;
  color: var(--color-text-tertiary);
  text-align: right;
  flex-shrink: 0;
}

.spacing-track {
  flex: 1;
  height: 14px;
  display: flex;
  align-items: center;
}

.spacing-bar {
  height: 100%;
  background: var(--color-primary);
  border-radius: 2px;
  min-width: 4px;
  opacity: 0.35;
  transition: opacity var(--duration-base) var(--ease-out);
}

.spacing-row:hover .spacing-bar {
  opacity: 0.7;
}

.spacing-px {
  width: 32px;
  font-size: 10.5px;
  font-family: var(--font-family-mono);
  font-weight: 400;
  color: var(--color-text-tertiary);
  flex-shrink: 0;
  opacity: 0.6;
}

/* ============================================
   SHADOWS
   ============================================ */
.shadow-strip {
  display: flex;
  gap: var(--space-5);
  align-items: flex-end;
}

.shadow-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.shadow-box {
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  transition: transform var(--duration-medium) var(--ease-out);
}

.shadow-item:hover .shadow-box {
  transform: translateY(-2px);
}

.shadow-label {
  font-size: 10.5px;
  font-family: var(--font-family-mono);
  font-weight: 400;
  color: var(--color-text-tertiary);
}

/* ============================================
   RADIUS
   ============================================ */
.radius-strip {
  display: flex;
  gap: var(--space-6);
  align-items: flex-end;
}

.radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.radius-shape {
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1.5px solid var(--color-primary);
  opacity: 0.6;
  transition: opacity var(--duration-fast);
}

.radius-item:hover .radius-shape {
  opacity: 1;
}

.radius-label {
  font-size: 10.5px;
  font-family: var(--font-family-mono);
  font-weight: 400;
  color: var(--color-text-tertiary);
}

/* ============================================
   COMPONENT DEMOS
   ============================================ */
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.demo-row--center {
  align-items: center;
}

.field-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.field-group {
  display: flex;
  flex-direction: column;
}

.control-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.alert-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.spinner-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.mono-label {
  font-size: 10.5px;
  font-family: var(--font-family-mono);
  font-weight: 400;
  color: var(--color-text-tertiary);
}

/* ============================================
   MODAL
   ============================================ */
.modal-demo {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-width: 380px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 960px) {
  .sidebar {
    display: none;
  }
  .content {
    margin-left: 0;
    padding: var(--space-8) var(--space-6) var(--space-16);
  }
  .card-row,
  .card-row--thirds {
    grid-template-columns: 1fr;
  }
  .semantic-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .shadow-strip,
  .radius-strip {
    flex-wrap: wrap;
  }
  .type-colors {
    grid-template-columns: 1fr;
  }
  .page-title {
    font-size: 2rem;
  }
}
</style>
