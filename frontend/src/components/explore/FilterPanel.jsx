import React from 'react';
import { TAGS, CITIES } from '../../data/mockData';

export default function FilterPanel({
  selectedCity = 'hue',
  onSelectCity = () => {},
  searchQuery = '',
  onSearchChange = () => {},
  selectedTags = [],
  onToggleTag = () => {},
  onClearTags = () => {},
  selectedZone = '',
  onZoneChange = () => {},
  zones = [],
  selectedCost = '1e9',
  onCostChange = () => {},
  selectedSort = 'pop',
  onSortChange = () => {},
  isOpenOnly = false,
  onOpenOnlyChange = () => {},
  totalCount = 0,
  filteredCount = 0,
  tagCounts = {},
  isAdmin = false,
  onAdminAdd = () => {},
  onAdminExport = () => {},
  onAdminReset = () => {},
  cartCount = 0,
  onOpenCart = () => {}
}) {
  const TAG_ICONS = {
    food: '🍜', culture: '🏛️', nature: '🌿', sightseeing: '📸', nightlife: '🌙',
    adventure: '🧗', beach: '🏖️', history: '📜', shopping: '🛍️'
  };

  return (
    <section className="panel">
      {/* Admin Quick Bar */}
      {isAdmin && (
        <div className="adm-bar" id="admBar">
          <span>⭐ Chế độ quản trị:</span>
          <button type="button" id="admAdd" onClick={onAdminAdd}>
            + Thêm địa điểm mới
          </button>
          <button type="button" id="admExport" onClick={onAdminExport}>
            Xuất dữ liệu JSON
          </button>
          <button type="button" id="admReset" onClick={onAdminReset}>
            Đặt lại ban đầu
          </button>
        </div>
      )}

      {/* Filter Form Controls */}
      <form className="filters" id="filters" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="search">
            <input
              type="search"
              id="q"
              placeholder="Tìm tên, đường, thể loại…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <button type="button" className="tripbtn-mini" id="tripBtn" onClick={onOpenCart}>
            🧳 Chuyến đi (<b id="tripCount">{cartCount}</b>)
          </button>
        </div>

        {/* Loại hình: chip luôn hiển thị */}
        <div className="tagbar" id="tagChips" role="group" aria-label="Loại hình">
          <span className="tagbar-label">Loại hình</span>
          <div className="tagbar-list">
            <button
              type="button"
              className={`tchip ${selectedTags.length === 0 ? 'on' : ''}`}
              aria-pressed={selectedTags.length === 0}
              onClick={onClearTags}
            >
              Tất cả
            </button>
            {Object.entries(TAGS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`tchip ${selectedTags.includes(key) ? 'on' : ''}`}
                aria-pressed={selectedTags.includes(key)}
                onClick={() => onToggleTag(key)}
              >
                <span aria-hidden="true">{TAG_ICONS[key] || '📍'}</span> {label}
                <em>{tagCounts[key] || 0}</em>
              </button>
            ))}
          </div>
        </div>

        {/* Destination + Zone + Cost: one grouped row */}
        <div className="row3">
          <label className="sel-field sel-city">
            <span>Điểm đến</span>
            <select
              id="citySel"
              aria-label="Điểm đến"
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
            >
              {Object.entries(CITIES).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name}
                </option>
              ))}
            </select>
          </label>

          <label className="sel-field sel-zone">
            <span>Khu vực</span>
            <select
              id="zone"
              aria-label="Khu vực"
              value={selectedZone}
              onChange={(e) => onZoneChange(e.target.value)}
            >
              <option value="">Tất cả khu vực</option>
              {zones.map((z) => (
                <option key={z.code} value={z.code}>
                  {z.name}
                </option>
              ))}
            </select>
          </label>

          <label className="sel-field sel-cost">
            <span>Giá vé</span>
            <select
              id="cost"
              aria-label="Giá vé"
              value={selectedCost}
              onChange={(e) => onCostChange(e.target.value)}
            >
              <option value="1e9">Mọi mức giá</option>
              <option value="0">Miễn phí</option>
              <option value="100000">Đến 100.000đ</option>
              <option value="300000">Đến 300.000đ</option>
            </select>
          </label>
        </div>

        <div className="row2">
          {/* Sorting Selector */}
          <select
            id="sort"
            aria-label="Sắp xếp"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="pop">Nổi tiếng nhất</option>
            <option value="costAsc">Giá thấp đến cao</option>
            <option value="durAsc">Thời gian ngắn nhất</option>
            <option value="name">Tên A–Z</option>
          </select>

          {/* Open Only Checkbox */}
          <label className="check" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="open"
              checked={isOpenOnly}
              onChange={(e) => onOpenOnlyChange(e.target.checked)}
            />{' '}
            Đang mở cửa
          </label>
        </div>
      </form>

      {/* Filter Statistics */}
      <p className="count" id="count" aria-live="polite" style={{ padding: '8px 16px', margin: 0, fontSize: '13px', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
        Hiển thị <b>{filteredCount}</b> / {totalCount} địa điểm
      </p>
    </section>
  );
}
