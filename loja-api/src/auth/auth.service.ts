import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  prisma: any;
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  // Validação do usuário com bcrypt
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result; // Retorna os dados do usuário sem a senha
    }
    return null; // Retorna null se a validação falhar
  }  

  // Método de login que gera o JWT
  async login(user: any, password: string, role: string) {
    const payload = { username: user.username, sub: user.id, role: user.role }; // Gera o payload do token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método opcional para registrar usuários com senha criptografada
  async signup(data: { username: string; password: string; role: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        role: data.role,
      },
    });
    return { message: 'User created successfully', user: { id: user.id, username: user.username, role: user.role } };
  }
}
