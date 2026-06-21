/**
 * Dashboard layout model — the customizable command center. The user can
 * reorder, hide and re-add widgets; the chosen layout is persisted per-device in
 * `app_settings_local` so it survives restarts. The catalog is the source of
 * truth for which widgets exist; a saved layout is always reconciled against it
 * so newly-shipped widgets appear and removed ones are dropped.
 */
import type { IconName } from '@/design/icons/Icon';
import { getJsonSetting, setJsonSetting } from '@/features/settings/repository';

export type WidgetId = 'kpis' | 'timeline' | 'alerts' | 'quick' | 'welcome';

export interface WidgetMeta {
  id: WidgetId;
  title: string;
  description: string;
  icon: IconName;
}

/** Every widget the dashboard can render, in default order. */
export const WIDGET_CATALOG: WidgetMeta[] = [
  { id: 'kpis', title: 'شاخص‌های کلیدی', description: 'مطالبات، نوبت امروز، بیماران، سفارش‌ها', icon: 'chart' },
  { id: 'timeline', title: 'نوبت‌های امروز', description: 'تایم‌لاین زندهٔ نوبت‌های امروز', icon: 'clock' },
  { id: 'alerts', title: 'هشدارها', description: 'سفارش‌های عقب‌افتاده و مطالبات', icon: 'alert' },
  { id: 'quick', title: 'دسترسی سریع', description: 'میان‌برِ بخش‌های پرکاربرد', icon: 'grid' },
  { id: 'welcome', title: 'خوش‌آمد و نقش', description: 'کاربر و نقشِ فعلی', icon: 'users' },
];

export interface WidgetConfig {
  id: WidgetId;
  visible: boolean;
}

export type DashboardLayout = WidgetConfig[];

const STORAGE_KEY = 'dashboard.layout.v1';

const DEFAULT_LAYOUT: DashboardLayout = WIDGET_CATALOG.map((w) => ({ id: w.id, visible: true }));

const META_BY_ID = new Map(WIDGET_CATALOG.map((w) => [w.id, w]));

export function widgetMeta(id: WidgetId): WidgetMeta {
  const meta = META_BY_ID.get(id);
  if (!meta) throw new Error(`Unknown dashboard widget: ${id}`);
  return meta;
}

/**
 * Reconcile a (possibly stale) saved layout with the current catalog: keep the
 * saved order/visibility for known widgets, drop unknown ids, and append any
 * catalog widgets that aren't in the saved layout (so new widgets surface).
 */
function reconcile(saved: DashboardLayout): DashboardLayout {
  const seen = new Set<WidgetId>();
  const kept: DashboardLayout = [];
  for (const cfg of saved) {
    if (META_BY_ID.has(cfg.id) && !seen.has(cfg.id)) {
      kept.push({ id: cfg.id, visible: cfg.visible });
      seen.add(cfg.id);
    }
  }
  for (const w of WIDGET_CATALOG) {
    if (!seen.has(w.id)) kept.push({ id: w.id, visible: true });
  }
  return kept;
}

export function loadLayout(): DashboardLayout {
  const saved = getJsonSetting<DashboardLayout | null>(STORAGE_KEY, null);
  if (!saved || !Array.isArray(saved)) return DEFAULT_LAYOUT;
  return reconcile(saved);
}

export function saveLayout(layout: DashboardLayout): void {
  setJsonSetting(STORAGE_KEY, layout);
}

export function resetLayout(): DashboardLayout {
  saveLayout(DEFAULT_LAYOUT);
  return DEFAULT_LAYOUT;
}

/** Move the widget at `index` one slot up (toward the top). */
export function moveUp(layout: DashboardLayout, index: number): DashboardLayout {
  if (index <= 0 || index >= layout.length) return layout;
  const next = [...layout];
  [next[index - 1], next[index]] = [next[index], next[index - 1]];
  return next;
}

/** Move the widget at `index` one slot down (toward the bottom). */
export function moveDown(layout: DashboardLayout, index: number): DashboardLayout {
  if (index < 0 || index >= layout.length - 1) return layout;
  const next = [...layout];
  [next[index + 1], next[index]] = [next[index], next[index + 1]];
  return next;
}

export function setVisible(layout: DashboardLayout, id: WidgetId, visible: boolean): DashboardLayout {
  return layout.map((c) => (c.id === id ? { ...c, visible } : c));
}
