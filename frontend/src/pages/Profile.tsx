import React, { useState } from 'react';
import userAvatarImg from '../assets/images/avatar_user_profile_1790105043411.jpg';
import { Button } from '../components/Common/Button';
import {
  Mail,
  ShieldCheck,
  Zap,
  Clock,
  FileText,
  CheckCircle2,
  Edit2,
  Calendar,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { Modal } from '../components/Common/Modal';

export const Profile: React.FC = () => {
  const [name, setName] = useState('Alex Vance');
  const [email] = useState('alex.vance@nova.ai');
  const [roleTitle, setRoleTitle] = useState('Principal Software Architect');
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form states
  const [tempName, setTempName] = useState(name);
  const [tempRole, setTempRole] = useState(roleTitle);

  const stats = [
    { label: 'Total Queries', value: '1,482', icon: <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> },
    { label: 'Voice Sessions', value: '14.8 hrs', icon: <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
    { label: 'Docs Processed', value: '87', icon: <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" /> },
    { label: 'Tasks Resolved', value: '124', icon: <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
  ];

  const handleSaveProfile = () => {
    setName(tempName);
    setRoleTitle(tempRole);
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md relative overflow-hidden transition-colors">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar frame */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-500 shadow-md">
              <img
                src={userAvatarImg}
                alt={name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
          </div>

          {/* User info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  {name}
                </h1>
                <p className="text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
                  {roleTitle}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  setTempName(name);
                  setTempRole(roleTitle);
                  setIsEditOpen(true);
                }}
              >
                Edit Profile
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Pro Member
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                Member since Jan 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Statistics Grid */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 mb-3">
          Usage & Telemetry
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((st, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{st.label}</span>
                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                  {st.icon}
                </div>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums tracking-tight">
                {st.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Plan & Connected Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subscription details */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Membership Tier</h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 font-semibold">
              Enterprise Neural
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Unlimited multimodal context windows, dedicated neural voice synthesis pipelines, and high-frequency code execution environments.
          </p>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Next billing date</span>
            <span className="text-slate-800 dark:text-slate-200 font-mono font-medium">Feb 14, 2027</span>
          </div>
        </div>

        {/* Active sessions */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Active Workspaces</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <Laptop className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200">MacBook Pro 16" · Chrome</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Current Session · San Francisco, US</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-semibold">
                Online
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200">iPhone 16 Pro · Safari Mobile</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Active 2 hrs ago</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Standby</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile Information"
        description="Update your display identity and workspace job title."
        maxWidth="md"
      >
        <div className="space-y-4 py-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1.5">
              Job Title / Architectural Role
            </label>
            <input
              type="text"
              value={tempRole}
              onChange={(e) => setTempRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
