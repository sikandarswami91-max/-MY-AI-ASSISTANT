import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User.js';
import { UserSettings } from '../models/UserSettings.js';
import { AICharacter } from '../models/AICharacter.js';
import { signToken } from '../utils/jwt.js';

export class AuthService {
  async register(data: { name: string; email: string; password: string }) {
    const existing = await User.findOne({ email: data.email.toLowerCase() });
    if (existing) {
      throw new Error('A user with that email already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: passwordHash,
      role: 'user',
    });

    // Initialize default UserSettings
    await UserSettings.create({
      userId: user._id,
      appearance: { theme: 'light' },
      voice: {
        selectedVoiceId: 'voice-nova-default',
        gender: 'female',
        language: 'English',
        speed: 1.0,
        pitch: 1.0,
        autoSpeak: false,
      },
      aiPreferences: {
        responseStyle: 'balanced',
        creativity: 0.7,
        continuousMemory: true,
      },
    });

    // Initialize default AICharacter
    await AICharacter.create({
      userId: user._id,
      characterId: 'char-nova',
      name: 'Nova',
      gender: 'female',
      personality: 'Adaptive Neural Assistant',
      title: 'Multimodal Cognitive Specialist',
      isDefault: true,
    });

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
      token,
    };
  }

  async login(email: string, passwordPlain: string) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error('Invalid email or password credentials.');
    }

    const isMatch = await bcrypt.compare(passwordPlain, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password credentials.');
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
      token,
    };
  }

  async changePassword(userId: string, currentPass: string, newPass: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    const isMatch = await bcrypt.compare(currentPass, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect.');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPass, salt);
    await user.save();

    return { success: true };
  }
}

export const authService = new AuthService();
