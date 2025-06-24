import bcrypt from 'bcrypt';

class PasswordGenerator {
  static generateRandomPassword(teacherName: string) {
    const randomNumber = Math.floor(1000 + Math.random() * 90000);
    const passwordData = {
      hashedVersion: bcrypt.hash(`${randomNumber}_${teacherName}`, 10), // note: async..table maa store garanako
      plainVersion: `${randomNumber}_${teacherName}` // teacher lai mail garna ko lagi
    };
    return passwordData;
  }
}

export default PasswordGenerator;
