
import { useEffect, useState } from "react";
import {
  User,
  Wallet,
  Palette,
  Save,
} from "lucide-react";

function Settings({
  settings,
  setSettings,
}) {
  const [draftSettings, setDraftSettings] =
    useState(settings);

  useEffect(() => {
    setDraftSettings(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDraftSettings({
      ...draftSettings,
      [name]: value,
    });
  };

  const handleSave = () => {
    setSettings(draftSettings);
  };

  return (
    <div className="settings-page">
      <div className="content-card settings-card">
        <div className="settings-header">
          <div>
            <h3>Settings</h3>
            <p>
              Manage your account preferences
            </p>
          </div>

          <button
            className="save-button settings-save-button"
            onClick={handleSave}
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">
            <div className="settings-section-icon">
              <User size={18} />
            </div>

            <div>
              <h4>Profile</h4>
              <p>Update your personal information</p>
            </div>
          </div>

          <div className="settings-field">
            <label>Display Name</label>

            <input
              type="text"
              name="name"
              value={draftSettings.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">
            <div className="settings-section-icon">
              <Wallet size={18} />
            </div>

            <div>
              <h4>Currency</h4>
              <p>
                Choose your preferred currency
              </p>
            </div>
          </div>

          <div className="settings-field">
            <label>Currency</label>

            <select
              name="currency"
              value={draftSettings.currency}
              onChange={handleChange}
            >
              <option value="AFN">
                AFN - Afghan Afghani
              </option>

              <option value="USD">
                USD - US Dollar
              </option>

              <option value="EUR">
                EUR - Euro
              </option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">
            <div className="settings-section-icon">
              <Palette size={18} />
            </div>

            <div>
              <h4>Appearance</h4>
              <p>
                Customize the appearance
              </p>
            </div>
          </div>

          <div className="settings-field">
            <label>Theme</label>

            <select
              name="theme"
              value={draftSettings.theme}
              onChange={handleChange}
            >
              <option value="dark">
                Dark
              </option>

              <option value="light">
                Light
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

